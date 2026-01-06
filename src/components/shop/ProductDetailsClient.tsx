'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import { ArrowLeft, Check, ShoppingCart, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductDetailsClientProps {
    product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {

    const handleBuyNow = async () => {
        if (!product) return;

        try {
            // 1. Create Payment Session
            const response = await fetch('/api/checkout/zoho', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: product.price,
                    currency: 'INR',
                    description: `Purchase: ${product.name}`,
                    customer: {
                        // In a real app, you'd get this from a form or auth
                        // For now we rely on Zoho's checkout form to collect details if configured
                        // or we pass dummy/guest info if required by strict API
                    }
                }),
            });

            const data = await response.json();

            if (!data.payment_session_id) {
                if (data.mock_mode) {
                    alert("MOCK CHECKOUT: Payment Session Created!\n\n(Since we don't have real keys yet, the actual popup won't load, but the wiring is complete.)");
                    return;
                }
                throw new Error('No Session ID returned');
            }

            // 2. Initialize Zoho Payments (using the global script we added in layout.tsx)
            // @ts-ignore - The global variable exists from the script
            const zpayment = new window.ZPayment();

            zpayment.open({
                payment_session_id: data.payment_session_id,
                // Add styling or callbacks here
            });

            zpayment.on("payment_success", async (response: any) => {
                console.log("Payment Successful", response);
                alert("Payment Successful! Order ID: " + response.order_id);

                // --- Instant Alert: Notify Admin ---
                try {
                    await fetch('/api/order-alert', {
                        method: 'POST',
                        body: JSON.stringify({
                            product: product.name,
                            amount: product.price,
                            orderId: response.order_id,
                            customerName: "Online User"
                        })
                    });
                } catch (e) {
                    console.error("Failed to send alert", e);
                }
                // -----------------------------------
            });

            zpayment.on("payment_error", (error: any) => {
                console.error("Payment Failed", error);
                alert("Payment Failed: " + error.message);
            });

        } catch (error: any) {
            console.error(error);
            alert("Checkout Error: " + error.message);
        }
    };

    // Fallback image
    // const imageSrc = product.image.startsWith('/') ? product.image : '/placeholder.jpg';

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link href="/shop" className="inline-flex items-center text-sm text-zinc-500 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Shop
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                            {/* Placeholder Icon */}
                            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        {/* Actual Image Tag would go here with Next/Image */}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            {product.subCategory}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                            {product.name}
                        </h1>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                            ₹{product.price.toLocaleString('en-IN')}
                        </div>

                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Features List */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Key Features</h3>
                            <ul className="space-y-3">
                                {product.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-zinc-600 dark:text-zinc-400">
                                        <Check size={20} className="text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                className="flex-1 py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/25 active:scale-95"
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </button>
                            <button className="flex-1 py-4 px-8 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-3 text-sm text-zinc-500">
                                <Truck size={20} />
                                <span>Fast PAN India Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-500">
                                <Shield size={20} />
                                <span>1 Year Warranty</span>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>
        </div>
    );
}
