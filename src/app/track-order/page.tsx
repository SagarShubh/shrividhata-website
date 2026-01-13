'use client';

import { useState } from 'react';
import { Search, Package, MapPin, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setIsLoading(true);
        setError(null);
        setOrder(null);

        try {
            const res = await fetch(`/api/track-order?id=${orderId}`);
            const data = await res.json();

            if (data.success) {
                setOrder(data.order);
            } else {
                setError(data.error || 'Order not found');
            }
        } catch (err) {
            setError('Failed to fetch order details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-2xl">

                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Truck className="text-blue-600" /> Track Your Order
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Enter your Order ID (from your confirmation email) to check the status.
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 mb-8">
                    <form onSubmit={handleTrack} className="flex gap-4">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Order ID (e.g., SO-00001)"
                            className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors disabled:opacity-70"
                        >
                            {isLoading ? 'Checking...' : 'Track'}
                        </button>
                    </form>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3"
                        >
                            <AlertCircle size={20} />
                            {error}
                        </motion.div>
                    )}

                    {order && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
                        >
                            {/* Header */}
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Order #{order.number}</h3>
                                    <p className="text-sm text-zinc-500">Placed on {order.date}</p>
                                </div>
                                <div className={`px-4 py-1 rounded-full text-sm font-bold capitalize
                                     ${order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                        order.status === 'shipped' ? 'bg-orange-100 text-orange-700' :
                                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                'bg-zinc-100 text-zinc-600'}`}>
                                    {order.status}
                                </div>
                            </div>

                            {/* Shipment Info (Mocked if empty logic for now) */}
                            <div className="p-6 space-y-6">

                                {order.status !== 'draft' && (
                                    <div className="relative pl-8 pt-1">
                                        {/* Simple vertical timeline */}
                                        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>

                                        <div className="mb-6 relative">
                                            <div className="absolute -left-[30px] w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-zinc-900"></div>
                                            <h4 className="font-bold text-zinc-900 dark:text-white">Order Confirmed</h4>
                                            <p className="text-sm text-zinc-500">We have received your order.</p>
                                        </div>

                                        {['shipped', 'delivered'].includes(order.status) && (
                                            <div className="mb-6 relative">
                                                <div className="absolute -left-[30px] w-4 h-4 rounded-full bg-blue-600 border-2 border-white dark:border-zinc-900"></div>
                                                <h4 className="font-bold text-zinc-900 dark:text-white">Order Shipped</h4>
                                                <p className="text-sm text-zinc-500">Your order is on the way.</p>
                                            </div>
                                        )}

                                        {['delivered'].includes(order.status) && (
                                            <div className="mb-6 relative">
                                                <div className="absolute -left-[30px] w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-zinc-900"></div>
                                                <h4 className="font-bold text-green-600">Delivered</h4>
                                                <p className="text-sm text-zinc-500">Package has been delivered.</p>
                                            </div>
                                        )}

                                    </div>
                                )}

                                {/* Items */}
                                <div>
                                    <h4 className="font-bold mb-4 flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                                        <Package size={18} /> Order Items
                                    </h4>
                                    <div className="space-y-3">
                                        {order.items.map((item: any, i: number) => (
                                            <div key={i} className="flex justify-between items-center text-sm p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                                                <div className="flex gap-3 items-center">
                                                    <div className="w-8 h-8 rounded bg-white dark:bg-zinc-700 flex items-center justify-center font-bold text-zinc-400">
                                                        {item.quantity}x
                                                    </div>
                                                    <span className="font-medium text-zinc-900 dark:text-white">{item.name}</span>
                                                </div>
                                                <span className="font-bold">₹{item.total.toLocaleString('en-IN')}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 font-bold text-lg">
                                        <span>Total Amount</span>
                                        <span>₹{order.total.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
