'use client';

import { useState, useMemo } from 'react';
import { Product, Category } from '@/data/products';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopSidebarProps {
    products: Product[];
    selectedCategory: Category | 'All';
    setSelectedCategory: (category: Category | 'All') => void;
    selectedBrands: string[];
    setSelectedBrands: (brands: string[]) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    className?: string;
}

const categories: Category[] = ['Cameras', 'Recorders', 'Storage', 'Accessories', 'Networking'];

export default function ShopSidebar({
    products,
    selectedCategory,
    setSelectedCategory,
    selectedBrands,
    setSelectedBrands,
    priceRange,
    setPriceRange,
    className = ''
}: ShopSidebarProps) {
    const [expandedSection, setExpandedSection] = useState<string | null>('all');

    // Extract unique brands
    const brands = useMemo(() => {
        const uniqueBrands = new Set(products.map(p => p.brand || 'Generic').filter(b => b));
        return Array.from(uniqueBrands).sort();
    }, [products]);

    // Handle Brand Selection
    const toggleBrand = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className={`w-full ${className}`}>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Filters</h3>
                    {(selectedCategory !== 'All' || selectedBrands.length > 0) && (
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setSelectedBrands([]);
                            }}
                            className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                        >
                            <X size={12} /> Clear
                        </button>
                    )}
                </div>

                {/* Categories */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Categories</h4>
                    <div className="space-y-2">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === 'All'
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                }`}
                        >
                            All Products
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <hr className="my-6 border-zinc-100 dark:border-zinc-800" />

                {/* Brands */}
                <div className="mb-6">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Brands</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                        {brands.map(brand => (
                            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => toggleBrand(brand)}
                                        className="peer w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                </div>
                                <span className={`text-sm group-hover:text-blue-600 transition-colors ${selectedBrands.includes(brand) ? 'text-zinc-900 dark:text-zinc-100 font-medium' : 'text-zinc-600 dark:text-zinc-400'
                                    }`}>
                                    {brand}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <hr className="my-6 border-zinc-100 dark:border-zinc-800" />

                {/* Price Range - Simple Min/Max for MVP */}
                <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Price Range</h4>
                    <div className="flex gap-2 items-center">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">₹</span>
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="w-full pl-6 pr-2 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Min"
                            />
                        </div>
                        <span className="text-zinc-400">-</span>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">₹</span>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="w-full pl-6 pr-2 py-2 text-sm bg-zinc-50 dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Max"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
