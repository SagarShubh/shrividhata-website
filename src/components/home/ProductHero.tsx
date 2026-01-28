"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, products } from "@/data/products";
import heroConfig from "@/data/hero-config.json"; // Import Configuration
import { HERO_THEMES, HeroSlide } from "@/lib/hero-types";

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
        setCurrent((prev) => (prev + 1) % heroConfig.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? heroConfig.length - 1 : prev - 1));
    };

    const slide = heroConfig[current] as HeroSlide;
    const theme = HERO_THEMES[slide.theme] || HERO_THEMES['blue-gradient'];

    // Fetch product details for price/link
    const product = products.find(p => p.id === slide.productId);

    const displayTitle = slide.customTitle || product?.name || "Featured Product";
    const displayDesc = slide.customDescription || product?.description || "Experience innovation with our latest collection.";
    const displayImage = slide.image || product?.image || "/placeholder.jpg";
    const displayPrice = product?.price || 0;
    const displayLink = `/shop/${slide.productId}`;
    const displayBrandLogo = slide.brandLogo;

    return (
        <section className={`relative w-full h-auto min-h-[600px] lg:h-[700px] flex items-center overflow-hidden transition-colors duration-700 ${theme.classes}`}>

            {/* Background Decorative Elements (Abstract Tech/Curves) - Opacity adjusted per theme */}
            <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${slide.theme === 'dark-tech' ? 'opacity-10' : 'opacity-60'}`}>
                {/* Large Blue Blob Top Right */}
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-100/40 blur-3xl mix-blend-multiply" />
                {/* Large Purple Blob Bottom Left */}
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-100/40 blur-3xl mix-blend-multiply" />
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05]" />
            </div>

            <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-12 lg:py-0 h-full">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between h-full gap-8 lg:gap-16">

                    {/* Content (Left on Desktop, Bottom on Mobile) */}
                    <div className="flex-1 text-center lg:text-left w-full max-w-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center lg:items-start"
                            >
                                {/* Brand Logo / Label */}
                                <div className="mb-6 h-8 sm:h-10 relative w-32 sm:w-40 flex items-center justify-center lg:justify-start">
                                    {displayBrandLogo ? (
                                        <Image
                                            src={displayBrandLogo}
                                            alt="Brand Logo"
                                            width={160}
                                            height={40}
                                            className={`object-contain object-left ${slide.theme === 'dark-tech' ? 'brightness-0 invert' : ''}`}
                                        />
                                    ) : (
                                        <span className="text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight ${theme.textClass}`}>
                                    {displayTitle}
                                </h1>

                                <p className={`text-base sm:text-lg mb-8 leading-relaxed max-w-prose mx-auto lg:mx-0 ${slide.theme === 'dark-tech' ? 'text-gray-300' : 'text-slate-600'}`}>
                                    {displayDesc}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                                    <Link
                                        href={displayLink}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0A74DA] text-white rounded-full hover:bg-[#005fb8] transition-all font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5 text-lg"
                                    >
                                        Shop Now
                                    </Link>
                                    <span className={`text-2xl sm:text-3xl font-bold ${theme.textClass}`}>
                                        ₹{displayPrice.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Product Image (Right on Desktop, Top on Mobile) */}
                    <div className="flex-1 relative w-full h-[280px] sm:h-[400px] lg:h-full flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slide.id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[550px] aspect-square"
                            >
                                {/* Product Image */}
                                <div className="relative w-full h-full filter drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300">
                                    <Image
                                        src={displayImage}
                                        alt={displayTitle}
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

            {/* Navigation Buttons (Hidden on Mobile, Visible on Desktop) */}
            <div className="hidden lg:block">
                <button
                    onClick={prevSlide}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border shadow-lg transition-all z-20 ${slide.theme === 'dark-tech'
                            ? 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900'
                            : 'bg-white/50 border-white/60 text-slate-700 hover:bg-white hover:text-[#0A74DA]'
                        }`}
                    aria-label="Previous Slide"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md border shadow-lg transition-all z-20 ${slide.theme === 'dark-tech'
                            ? 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900'
                            : 'bg-white/50 border-white/60 text-slate-700 hover:bg-white hover:text-[#0A74DA]'
                        }`}
                    aria-label="Next Slide"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>

            {/* Dots Pagination (Visible on all) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroConfig.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`transition-all duration-300 rounded-full h-2 ${idx === current
                                ? "w-8 bg-[#0A74DA]"
                                : `w-2 ${slide.theme === 'dark-tech' ? 'bg-white/30 hover:bg-white/50' : 'bg-slate-300 hover:bg-slate-400'}`
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
