'use client';

import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, getSubtotal } = useCart();
    const subtotal = getSubtotal();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 px-4">
                <div className="max-w-md mx-auto text-center">
                    <div className="inline-block p-6 bg-white dark:bg-zinc-900 rounded-full shadow-sm mb-6">
                        <ShoppingCart size={48} className="text-zinc-300" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                    <p className="text-zinc-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft size={18} /> Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <ShoppingCart /> Your Cart ({items.length} items)
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white dark:bg-zinc-900 rounded-2xl p-4 flex gap-4 border border-zinc-100 dark:border-zinc-800"
                            >
                                <div className="relative w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-2"
                                        unoptimized={item.image.startsWith('/api/images')}
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-semibold text-zinc-900 dark:text-white line-clamp-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                                ₹{item.price.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-400 hover:text-red-500 p-1"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md disabled:opacity-50 transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded-md transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">
                                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sticky top-24 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Order Summary</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/25"
                            >
                                Proceed to Checkout
                            </Link>

                            <Link href="/shop" className="block text-center text-sm text-zinc-500 hover:text-blue-600 mt-4 underline">
                                Continue Shopping
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
