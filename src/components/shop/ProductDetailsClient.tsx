'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/data/products';
import { ArrowLeft, Check, ShoppingCart, Truck, Shield, X, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDetailsClientProps {
    product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const imageSrc = product.image.startsWith('/') ? product.image : '/placeholder.jpg';
    const [showShippingModal, setShowShippingModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setShippingDetails({
            ...shippingDetails,
            [e.target.name]: e.target.value
        });
    };


    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/checkout/zoho', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product,
                    quantity: 1,
                    shippingDetails
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            // Success!!
            alert(`Order Placed Successfully! Reference Details: ${data.orderId || 'Saved'}`);
            setShowShippingModal(false);

        } catch (error: any) {
            console.error("Checkout Failed:", error);
            alert(`Order Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

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
                        <Image
                            src={imageSrc}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
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


                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                className="flex-1 py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/25 active:scale-95"
                                onClick={() => setShowShippingModal(true)}
                            >
                                Buy Now
                            </button>
                            {/* <button className="flex-1 py-4 px-8 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button> */}
                        </div>

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

            {/* Shipping Form Modal */}
            <AnimatePresence>
                {showShippingModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Shipping Details</h3>
                                <button onClick={() => setShowShippingModal(false)} className="text-zinc-400 hover:text-zinc-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handlePayment} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text" name="name" placeholder="Full Name" required
                                        className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none outline-none focus:ring-2 focus:ring-blue-500"
                                        value={shippingDetails.name} onChange={handleInputChange}
                                    />
                                    <input
                                        type="tel" name="phone" placeholder="Phone Number" required
                                        className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none outline-none focus:ring-2 focus:ring-blue-500"
                                        value={shippingDetails.phone} onChange={handleInputChange}
                                    />
                                </div>
                                <input
                                    type="email" name="email" placeholder="Email Address" required
                                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none outline-none focus:ring-2 focus:ring-blue-500"
                                    value={shippingDetails.email} onChange={handleInputChange}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <input
                                        type="text" name="city" placeholder="City" required
                                        className="sm:col-span-2 w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none outline-none focus:ring-2 focus:ring-blue-500"
                                        value={shippingDetails.city} onChange={handleInputChange}
                                    />
                                    <input
                                        type="text" name="pincode" placeholder="Pin Code" required
                                        className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none outline-none focus:ring-2 focus:ring-blue-500"
                                        value={shippingDetails.pincode} onChange={handleInputChange}
                                    />
                                </div>
                                <textarea
                                    name="address" placeholder="Full Shipping Address" required rows={3}
                                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none outline-none focus:ring-2 focus:ring-blue-500"
                                    value={shippingDetails.address} onChange={handleInputChange}
                                ></textarea>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/25 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : (
                                        <>
                                            <Lock size={18} />
                                            Confirm Order
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-zinc-500">
                                    We will contact you shortly to confirm payment on delivery or via UPI.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
