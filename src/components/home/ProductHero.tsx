"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, products } from "@/data/products";

// Select top products to feature
const FEATURED_PRODUCTS = products.filter(p => ["cam-001", "rec-002", "cam-003", "cam-004"].includes(p.id));

export function ProductHero() {
    const [current, setCurrent] = useState(0);

    // Auto-slide
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [current]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? FEATURED_PRODUCTS.length - 1 : prev - 1));
    };

    const product = FEATURED_PRODUCTS[current];

    return (
        <section className="relative w-full h-[600px] lg:h-[700px] flex items-center bg-slate-50 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-100/50 blur-3xl opacity-60" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-3xl opacity-60" />
            </div>

            <div className="container relative z-10 px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8 lg:gap-16">

                    {/* Left: Content */}
                    <div className="flex-1 text-center lg:text-left pt-12 lg:pt-0 max-w-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Brand Label */}
                                <div className="mb-4 inline-block">
                                    <span className="text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                        {product.category}
                                    </span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                                    {product.name}
                                </h1>

                                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-prose mx-auto lg:mx-0">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-center lg:justify-start gap-4">
                                    <Link
                                        href={`/shop/${product.id}`}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-lg hover:bg-red-700 transition-all font-semibold shadow-lg shadow-red-900/20 hover:shadow-red-900/40 transform hover:-translate-y-1"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Shop Now
                                    </Link>
                                    <span className="text-2xl font-bold text-slate-900">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Product Image */}
                    <div className="flex-1 relative w-full h-[400px] lg:h-full flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full max-w-[500px] aspect-square"
                            >
                                {/* Product Image */}
                                {/* Note: Using fill for better responsiveness, object-fit contain */}
                                <div className="relative w-full h-full drop-shadow-2xl">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons (Arrows) */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-white hover:text-secondary shadow-lg transition-all z-20"
                aria-label="Previous Slide"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-white hover:text-secondary shadow-lg transition-all z-20"
                aria-label="Next Slide"
            >
                <ArrowRight className="w-6 h-6" />
            </button>

            {/* Dots Pagination */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {FEATURED_PRODUCTS.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`transition-all duration-300 rounded-full ${idx === current
                                ? "w-8 h-2 bg-secondary"
                                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
