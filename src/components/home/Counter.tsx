"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface CounterProps {
    value: number;
    label: string;
    suffix?: string;
}

function CounterItem({ value, label, suffix = "" }: CounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const springValue = useSpring(0, {
        duration: 2000,
        bounce: 0,
    });

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, value, springValue]);

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest));
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        displayValue.on("change", (latest) => setCurrentValue(latest));
    }, [displayValue]);

    return (
        <div ref={ref} className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div className="text-5xl lg:text-6xl font-black text-white mb-2 tracking-tighter relative z-10">
                {currentValue}{suffix}
            </motion.div>
            <div className="text-blue-300 font-semibold uppercase tracking-wider text-sm relative z-10">
                {label}
            </div>
        </div>
    );
}

export function Counter() {
    return (
        <section className="py-20 bg-slate-900 overflow-hidden relative">
            {/* Background decorative patterns */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute -bottom-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-red-500/20 blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <CounterItem value={10} label="Years of Excellence" suffix="+" />
                    <CounterItem value={1500} label="Projects Completed" suffix="+" />
                    <CounterItem value={500} label="Happy Clients" suffix="+" />
                    <CounterItem value={15} label="Certified Experts" suffix="+" />
                </div>
            </div>
        </section>
    );
}
