"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import heroConfig from "@/data/hero-config.json";
import { HERO_THEMES, HeroSlide } from "@/lib/hero-types";

// Duration for auto-slide (ms)
const AUTO_SLIDE_DURATION = 6000;

export function ProductHero() {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);

    // Auto-slide & Progress Bar
    useEffect(() => {
        setProgress(0);
        const startTime = Date.now();
        const interval = 50; // Update frequency

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / AUTO_SLIDE_DURATION) * 100, 100);
            setProgress(newProgress);

            if (elapsed >= AUTO_SLIDE_DURATION) {
                nextSlide();
            }
        }, interval);

        return () => clearInterval(timer);
    }, [current]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % heroConfig.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? heroConfig.length - 1 : prev - 1));
    };

    const currentSlide = heroConfig[current] as HeroSlide;
    const nextSlideIndex = (current + 1) % heroConfig.length;
    const nextSlideData = heroConfig[nextSlideIndex] as HeroSlide;

    const theme = HERO_THEMES[currentSlide.theme] || HERO_THEMES['blue-gradient'];

    // Data Resolution
    const getSlideData = (s: HeroSlide) => {
        const p = products.find(prod => prod.id === s.productId);
        return {
            title: s.customTitle || p?.name || "Featured Product",
            desc: s.customDescription || p?.description || "Experience innovation.",
            image: s.image || p?.image || "/placeholder.jpg",
            price: p?.price || 0,
            link: `/shop/${s.productId}`,
            brandLogo: s.brandLogo,
            category: p?.category
        };
    };

    const data = getSlideData(currentSlide);
    const nextData = getSlideData(nextSlideData);

    return (
        <section className={`relative w-full max-w-[1440px] mx-auto h-[82vh] min-h-[650px] max-h-[900px] mt-4 mb-8 rounded-[2.5rem] overflow-hidden transition-colors duration-1000 shadow-2xl ${theme.classes}`}>

            {/* --- Background --- */}
            <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${currentSlide.theme === 'dark-tech' ? 'opacity-20' : 'opacity-60'}`}>
                {/* Dynamic localized blurs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-blue-300/30 to-purple-300/30 blur-3xl mix-blend-multiply"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-indigo-300/30 to-cyan-300/30 blur-3xl mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
            </div>

            {/* --- Main Content Grid --- */}
            <div className="container relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 h-full items-center">

                    {/* Left: Text Content (6 cols) */}
                    <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 relative z-20 pb-24 lg:pb-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Brand Badge */}
                                <div className="mb-8 h-12 flex items-center">
                                    {data.brandLogo ? (
                                        <div className="relative h-12 w-36">
                                            <Image
                                                src={data.brandLogo}
                                                alt="Brand"
                                                fill
                                                className={`object-contain object-left ${currentSlide.theme === 'dark-tech' ? 'brightness-0 invert' : 'brightness-0 opacity-80'}`}
                                            />
                                        </div>
                                    ) : (
                                        <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-black/5 rounded-full text-slate-500">
                                            {data.category}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className={`text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold leading-[0.95] tracking-tight mb-8 ${theme.textClass}`}>
                                    {data.title}
                                </h1>

                                {/* Description */}
                                <p className={`text-xl leading-relaxed mb-10 max-w-lg font-medium ${currentSlide.theme === 'dark-tech' ? 'text-gray-400' : 'text-slate-600'}`}>
                                    {data.desc}
                                </p>

                                {/* CTA Area */}
                                <div className="flex flex-wrap items-center gap-8">
                                    <Link
                                        href={data.link}
                                        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative font-bold text-lg">Shop Now</span>
                                        <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>

                                    <div className="flex flex-col">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${currentSlide.theme === 'dark-tech' ? 'text-gray-500' : 'text-slate-500'}`}>Price</span>
                                        <span className={`text-3xl font-extrabold ${theme.textClass}`}>
                                            ₹{data.price.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Parallax Image (6 cols) */}
                    <div className="lg:col-span-6 h-[400px] lg:h-full relative flex items-center justify-center order-1 lg:order-2 perspective-1000">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide.id}
                                initial={{ opacity: 0, x: 100, scale: 0.8, rotateY: 15 }}
                                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, x: -100, scale: 0.8, rotateY: -15 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="relative w-full h-full max-h-[700px] flex items-center justify-center"
                            >
                                {/* Blur Shadow behind image */}
                                <div className="absolute w-[70%] h-[70%] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-[80px]" />

                                <div className="relative w-[90%] h-[90%] filter drop-shadow-2xl transform transition-transform duration-500">
                                    <Image
                                        src={data.image}
                                        alt={data.title}
                                        fill
                                        className="object-contain"
                                        priority
                                        sizes="(max-width: 1280px) 100vw, 50vw"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* --- Bottom Controls & Next Preview --- */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 z-30 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 pointer-events-none">

                {/* Progress Indicators */}
                <div className="flex items-center gap-3 pointer-events-auto">
                    {heroConfig.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className="group relative py-2"
                        >
                            <div className={`h-1.5 rounded-full transition-all duration-300 ${idx === current
                                ? "w-16 bg-slate-900/10 shadow-inner"
                                : "w-3 bg-slate-300/50 group-hover:bg-slate-400/80 group-hover:w-5"
                                }`}>
                                {/* Active Progress Fill */}
                                {idx === current && (
                                    <motion.div
                                        className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                                        style={{ width: `${progress}%` }}
                                        layoutId="progress"
                                    />
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* "Next Up" Thumbnail Card */}
                <div
                    onClick={nextSlide}
                    className="pointer-events-auto cursor-pointer group flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-2 pr-6 rounded-2xl hover:bg-white/20 transition-all shadow-xl max-w-[300px]"
                >
                    <div className="relative w-16 h-16 bg-white/80 rounded-xl overflow-hidden p-2 flex-shrink-0">
                        <Image
                            src={nextData.image}
                            alt="Next"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-0.5">Next Up</div>
                        <div className={`text-sm font-bold truncate ${currentSlide.theme === 'dark-tech' ? 'text-white' : 'text-slate-900'}`}>
                            {nextData.title}
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>

            </div>
        </section>
    );
}
