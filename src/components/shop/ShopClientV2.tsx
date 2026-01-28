'use client';

import { useState } from 'react';
import { Category, Product } from '@/data/products';
import TechnicalProductCard from '@/components/shop/TechnicalProductCard';
import ShopSidebarV2 from '@/components/shop/ShopSidebarV2';
import { Filter, Search, ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc';

interface ShopClientV2Props {
    initialProducts: Product[];
}

export default function ShopClientV2({ initialProducts }: ShopClientV2Props) {
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
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.brand || '').toLowerCase().includes(searchQuery.toLowerCase());
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
        <div className="min-h-screen bg-white dark:bg-black pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-[1440px]">

                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* Desktop Sidebar (Left) */}
                    <aside className="hidden lg:block w-64 sticky top-28 shrink-0">
                        <ShopSidebarV2
                            products={initialProducts}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            selectedBrands={selectedBrands}
                            setSelectedBrands={setSelectedBrands}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    </aside>

                    {/* Main Content (Right) */}
                    <div className="w-full flex-1">

                        {/* Top Toolbar */}
                        <div className="bg-white dark:bg-zinc-900 rounded-lg p-3 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center sticky top-24 z-10">

                            {/* Search */}
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by name, SKU, brand..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-blue-500 text-sm outline-none"
                                />
                            </div>

                            {/* Mobile Filter Toggle */}
                            <button
                                className="lg:hidden w-full md:w-auto px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md font-medium text-sm flex items-center justify-center gap-2"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter size={16} /> Filters
                            </button>

                            {/* Sorting & Count */}
                            <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
                                <span className="text-xs text-zinc-500 font-medium hidden md:inline-block">
                                    Showing {sortedProducts.length} Results
                                </span>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-zinc-400">Sort By:</span>
                                    <select
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                                        className="bg-transparent text-sm font-medium text-zinc-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
                                    >
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                        <option value="name-asc">Name: A - Z</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Filters Drawer */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="lg:hidden overflow-hidden mb-6"
                                >
                                    <ShopSidebarV2
                                        products={initialProducts}
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                        selectedBrands={selectedBrands}
                                        setSelectedBrands={setSelectedBrands}
                                        priceRange={priceRange}
                                        setPriceRange={setPriceRange}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Product Grid - 4 Columns on Large Screens */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {sortedProducts.length > 0 ? (
                                sortedProducts.map((product) => (
                                    <TechnicalProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-zinc-500 bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
                                    <div className="inline-block p-4 rounded-full bg-white mb-4 shadow-sm">
                                        <Search size={24} className="text-zinc-400" />
                                    </div>
                                    <h3 className="text-sm font-bold mb-1 text-zinc-700">No products found</h3>
                                    <p className="text-xs text-zinc-400">Adjust your filters or search query.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
