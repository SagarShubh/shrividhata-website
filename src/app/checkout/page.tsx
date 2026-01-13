'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useForm } from 'react-hook-form';
import { Loader2, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CheckoutForm {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
}

export default function CheckoutPage() {
    const { items, getSubtotal, clearCart } = useCart();
    const subtotal = getSubtotal();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState<{ id: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();

    const onSubmit = async (data: CheckoutForm) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/checkout/zoho', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items,
                    shippingDetails: data
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to place order');
            }

            setOrderSuccess({ id: result.orderId });
            clearCart();
            window.scrollTo(0, 0);

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 px-4 flex items-center justify-center">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-zinc-100 dark:border-zinc-800">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        Thank you for your purchase. Your order has been placed successfully.
                    </p>
                    <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl mb-8">
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Order ID</p>
                        <p className="text-lg font-mono font-bold text-zinc-900 dark:text-white select-all">
                            {orderSuccess.id}
                        </p>
                    </div>
                    <div className="space-y-3">
                        <Link
                            href="/shop"
                            className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors"
                        >
                            Continue Shopping
                        </Link>
                        <Link
                            href="/track-order"
                            className="block w-full py-3 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                        >
                            Track Order
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 px-4 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link href="/shop" className="text-blue-600 hover:underline">
                    Browse Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <ShieldCheck className="text-blue-600" /> Secure Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Shipping Form */}
                    <div>
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 mb-6">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <MapPin size={20} className="text-blue-500" /> Shipping Details
                            </h2>

                            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Full Name</label>
                                        <input
                                            {...register("name", { required: "Name is required" })}
                                            className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="Sagar Vaishanva"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Phone Number</label>
                                        <input
                                            {...register("phone", { required: "Phone is required" })}
                                            className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="+91 9876543210"
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email Address</label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                        })}
                                        className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Address</label>
                                    <textarea
                                        {...register("address", { required: "Address is required" })}
                                        className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24 resize-none"
                                        placeholder="Building, Street, Landmark..."
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">City</label>
                                        <input
                                            {...register("city", { required: "City is required" })}
                                            className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="Mumbai"
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Pincode</label>
                                        <input
                                            {...register("pincode", { required: "Pincode is required" })}
                                            className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            placeholder="400001"
                                        />
                                        {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div>
                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 sticky top-24">
                            <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start text-sm">
                                        <div className="flex-1">
                                            <p className="font-medium text-zinc-900 dark:text-white line-clamp-1">{item.name}</p>
                                            <p className="text-zinc-500 text-xs">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-zinc-900 dark:text-white whitespace-nowrap">
                                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2 mb-6">
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-xl pt-2 text-zinc-900 dark:text-white">
                                    <span>Total</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Processing...
                                    </>
                                ) : (
                                    'Place Order'
                                )}
                            </button>

                            <p className="text-xs text-center text-zinc-400 mt-4">
                                Secure payments processed by Zoho. Your data is encrypted.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
