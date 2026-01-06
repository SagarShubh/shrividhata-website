'use client';

import { useState } from 'react';
import { Category, Product } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import { Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories: Category[] = ['Cameras', 'Recorders', 'Storage', 'Accessories', 'Networking'];

interface ShopClientProps {
    initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filter logic
    const filteredProducts = initialProducts.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Security Shop
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Professional grade CCTV cameras, recorders, and accessories for your home and business security needs.
                    </p>
                </div>

                {/* Controls Bar */}
                <div className="sticky top-20 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                            />
                        </div>

                        {/* Desktop Categories */}
                        <div className="hidden md:flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'All'
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                    }`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            className="md:hidden p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter size={20} />
                        </button>
                    </div>

                    {/* Mobile Categories (Collapsible) */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="flex flex-wrap gap-2 pt-4 pb-2">
                                    <button
                                        onClick={() => setSelectedCategory('All')}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === 'All'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                            }`}
                                    >
                                        All
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === cat
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-zinc-500">
                            <div className="inline-block p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 mb-4">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No products found</h3>
                            <p>Try adjusting your search or category filter.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
