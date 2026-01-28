'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { ShoppingCart, FileText } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface TechnicalProductCardProps {
    product: Product;
}

export default function TechnicalProductCard({ product }: TechnicalProductCardProps) {
    const { addToCart } = useCart();

    // Use the product image or a safe fallback
    const imageSrc = product.image && product.image.startsWith('/')
        ? product.image
        : '/products/dome-cam.jpg';

    return (
        <div className="group relative bg-white border border-zinc-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col h-full">

            {/* Top: Image & Overlay */}
            <div className="relative aspect-[4/3] w-full bg-white p-4 border-b border-zinc-100">
                <Link href={`/shop/${product.id}`} className="block w-full h-full relative">
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>

                {/* Brand Tag */}
                <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded border border-zinc-200">
                        {product.brand || 'Generic'}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                {/* SKU / ID */}
                <div className="mb-1 text-[10px] font-mono text-zinc-400">
                    SKU: {product.id}
                </div>

                {/* SubCategory */}
                <div className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide mb-1.5">
                    {product.subCategory}
                </div>

                {/* Title */}
                <Link href={`/shop/${product.id}`} className="block mb-3">
                    <h3 className="text-sm font-bold text-zinc-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                    </h3>
                </Link>

                {/* Divider */}
                <div className="mt-auto border-t border-zinc-100 pt-3 flex items-center justify-between">

                    {/* Price Block */}
                    <div>
                        <div className="text-lg font-bold text-zinc-900 leading-none">
                            ₹{product.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-medium mt-0.5">
                            Excl. GST
                        </div>
                    </div>

                    {/* Actions */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded hover:bg-blue-600 hover:text-white transition-colors"
                    >
                        <ShoppingCart size={14} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
}
