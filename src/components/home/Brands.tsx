"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
    { name: "Hikvision", logo: "/brands/hikvision.png" },
    { name: "Prama India", logo: "/brands/prama.jpg" },
    { name: "Dahua", logo: "/brands/dahua.png" },
    { name: "CP Plus", logo: null }, // Text fallback
    { name: "Seagate", logo: null }, // Text fallback
    { name: "Molex", logo: "/brands/molex.png" },
    { name: "Ezviz", logo: "/brands/ezviz.png" },
];

export function Brands() {
    return (
        <section id="brands" className="py-20 bg-white border-t border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <h2 className="text-2xl font-bold text-center text-slate-600 uppercase tracking-wide">
                    Trusted Partners & Brands
                </h2>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="flex animate-marquee whitespace-nowrap items-center">
                    <BrandList items={brands} />
                    <BrandList items={brands} />
                    <BrandList items={brands} />
                    <BrandList items={brands} />
                </div>

                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />
            </div>
        </section>
    );
}

function BrandList({ items }: { items: typeof brands }) {
    return (
        <div className="flex items-center gap-16 mx-8">
            {items.map((brand, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center min-w-[150px] h-24 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 cursor-pointer"
                >
                    {brand.logo ? (
                        <div className="relative w-[150px] h-16">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <div className="text-2xl font-bold text-slate-400 hover:text-blue-900 border-2 border-slate-200 border-dashed rounded-lg px-6 py-2">
                            {brand.name}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
