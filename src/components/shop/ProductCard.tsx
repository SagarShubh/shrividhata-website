'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    // Use the product image or a safe fallback
    const imageSrc = product.image && product.image.startsWith('/')
        ? product.image
        : '/products/dome-cam.jpg';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-4">
                <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={product.image.startsWith('/api/images')}
                />

                {/* Floating Add to Cart Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                    }}
                    className="absolute bottom-4 right-4 p-3 bg-white dark:bg-zinc-900 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white z-10"
                    title="Add to Cart"
                >
                    <ShoppingCart size={20} />
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                    {/* Overlay gradient only */}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">
                    {product.subCategory}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2 flex-grow">
                    {product.name}
                </h3>

                {/* Brand Tag if available */}
                {product.brand && (
                    <div className="mb-2">
                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-1 rounded-full">
                            {product.brand}
                        </span>
                    </div>
                )}

                <div className="flex items-end justify-between mt-auto pt-4">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Price</p>
                        <p className="text-xl font-bold text-zinc-900 dark:text-white">
                            ₹{product.price.toLocaleString('en-IN')}
                        </p>
                    </div>
                    <Link
                        href={`/shop/${product.id}`}
                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    >
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
