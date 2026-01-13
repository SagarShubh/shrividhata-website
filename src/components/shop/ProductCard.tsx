'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Use the product image or a safe fallback
    const imageSrc = product.image && product.image.startsWith('/')
        ? product.image
        : '/products/dome-cam.jpg';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
        >
            {/* Imagine Container */}
            <div className="aspect-square relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-4">
                <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized // Bypass Next.js optimization to load API proxy images directly
                />

                {/* We will implement real images properly later, for now just a colored overlay or placeholder text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Link
                        href={`/shop/${product.id}`}
                        className="w-full py-2 bg-white text-black font-medium rounded-lg text-center hover:bg-blue-50 transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1 uppercase tracking-wider">
                    {product.subCategory}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-500 transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="text-xl font-bold text-zinc-900 dark:text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    <button className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all">
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
