"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/hero-bg.png')",
                }}
            >
                <div className="absolute inset-0 bg-slate-900/70 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            </div>

            <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 mb-6 backdrop-blur-sm">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-sm font-medium">Trusted Security Experts</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Secure Your World with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500">ShriVidhata</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                        Leading provider of premium CCTV surveillance systems, installation, and maintenance services. We partner with top global brands to ensure your safety.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                        <Link
                            href="/#contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-secondary rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/30"
                        >
                            Get a Free Quote
                        </Link>
                        <Link
                            href="/#services"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border border-slate-600 bg-white/5 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm group"
                        >
                            Explore Services
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
        </section>
    );
}
