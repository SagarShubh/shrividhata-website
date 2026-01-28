'use client';

import { useState, useMemo } from 'react';
import { Product, Category } from '@/data/products';
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopSidebarV2Props {
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

export default function ShopSidebarV2({
    products,
    selectedCategory,
    setSelectedCategory,
    selectedBrands,
    setSelectedBrands,
    priceRange,
    setPriceRange,
    className = ''
}: ShopSidebarV2Props) {
    // Extract unique brands with counts
    const brandCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        products.forEach(p => {
            const brand = p.brand || 'Generic';
            counts[brand] = (counts[brand] || 0) + 1;
        });
        return counts;
    }, [products]);

    const brands = Object.keys(brandCounts).sort();

    // Handle Brand Selection
    const toggleBrand = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    return (
        <div className={`w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50 rounded-t-lg">
                <h3 className="font-bold text-sm uppercase tracking-wide text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                    <Filter size={14} /> Refine Search
                </h3>
                {(selectedCategory !== 'All' || selectedBrands.length > 0) && (
                    <button
                        onClick={() => {
                            setSelectedCategory('All');
                            setSelectedBrands([]);
                        }}
                        className="text-xs text-blue-600 hover:underline font-medium"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h4 className="text-xs font-bold uppercase text-zinc-500 mb-3 tracking-wider">Product Category</h4>
                <div className="space-y-1">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex justify-between items-center group ${selectedCategory === 'All'
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                            }`}
                    >
                        <span>All Products</span>
                        <span className="text-xs text-zinc-400 group-hover:text-zinc-500">{products.length}</span>
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex justify-between items-center group ${selectedCategory === cat
                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                                }`}
                        >
                            <span>{cat}</span>
                            <span className="text-xs text-zinc-400 group-hover:text-zinc-500">
                                {products.filter(p => p.category === cat).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Brands */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h4 className="text-xs font-bold uppercase text-zinc-500 mb-3 tracking-wider">Manufacturer</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-200">
                    {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleBrand(brand)}
                                    className="peer w-3.5 h-3.5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>
                            <div className="flex-1 flex justify-between items-center">
                                <span className={`text-sm group-hover:text-blue-600 transition-colors ${selectedBrands.includes(brand) ? 'text-zinc-900 font-medium' : 'text-zinc-600'
                                    }`}>
                                    {brand}
                                </span>
                                <span className="text-xs text-zinc-400">{brandCounts[brand]}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="p-4">
                <h4 className="text-xs font-bold uppercase text-zinc-500 mb-3 tracking-wider">Price Range</h4>
                <div className="flex gap-2 items-center">
                    <div className="relative w-1/2">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">₹</span>
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-full pl-5 pr-1 py-1 text-sm bg-zinc-50 border border-zinc-200 rounded focus:border-blue-500 outline-none"
                            placeholder="Min"
                        />
                    </div>
                    <span className="text-zinc-300">-</span>
                    <div className="relative w-1/2">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">₹</span>
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-full pl-5 pr-1 py-1 text-sm bg-zinc-50 border border-zinc-200 rounded focus:border-blue-500 outline-none"
                            placeholder="Max"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
