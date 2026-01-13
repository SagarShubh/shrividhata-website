'use client';

import { useState } from 'react';
import { Category, Product } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import ShopSidebar from '@/components/shop/ShopSidebar';
import { Filter, Search, ArrowUpDown, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories: Category[] = ['Cameras', 'Recorders', 'Storage', 'Accessories', 'Networking'];

type SortOption = 'price-asc' | 'price-desc' | 'name-asc';

interface ShopClientProps {
    initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('price-asc');
    const [showFilters, setShowFilters] = useState(false);

    // Filter logic
    const filteredProducts = initialProducts.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

        return matchesCategory && matchesSearch && matchesBrand && matchesPrice;
    });

    // Sort logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
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

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 sticky top-24 shrink-0">
                        <ShopSidebar
                            products={initialProducts}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedBrands={selectedBrands}
                            setSelectedBrands={setSelectedBrands}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    </aside>

                    {/* Main Content */}
                    <div className="w-full flex-1">

                        {/* Top Controls (Search & Sort) */}
                        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-6 sticky top-20 z-20">
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

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

                                <div className="flex w-full md:w-auto gap-4">
                                    {/* Mobile Filter Toggle */}
                                    <button
                                        className="lg:hidden px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-medium text-sm flex items-center gap-2"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <Filter size={16} /> Filters
                                    </button>

                                    <div className="relative w-full md:w-48">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                                            <ArrowUpDown size={16} />
                                        </div>
                                        <select
                                            value={sortOption}
                                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-none text-sm text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                                            style={{ backgroundImage: 'none' }}
                                        >
                                            <option value="price-asc">Price: Low to High</option>
                                            <option value="price-desc">Price: High to Low</option>
                                            <option value="name-asc">Name: A to Z</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Filters Drawer/Expandable */}
                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="lg:hidden overflow-hidden"
                                    >
                                        <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
                                            <ShopSidebar
                                                products={initialProducts}
                                                selectedCategory={selectedCategory}
                                                setSelectedCategory={setSelectedCategory}
                                                selectedBrands={selectedBrands}
                                                setSelectedBrands={setSelectedBrands}
                                                priceRange={priceRange}
                                                setPriceRange={setPriceRange}
                                                className="shadow-none border-none p-0 bg-transparent"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedProducts.length > 0 ? (
                                sortedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-zinc-500">
                                    <div className="inline-block p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 mb-4">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">No products found</h3>
                                    <p>Try adjusting your search or filters.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
