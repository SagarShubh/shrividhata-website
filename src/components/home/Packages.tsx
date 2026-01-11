"use client";

import { motion } from "framer-motion";
import { Check, Shield, Zap, Smartphone, HardDrive, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/data/products";

// Define our package definitions.
// These are the "Templates". The Price and Description (Tagline) will be overridden by Zoho if found.
const packageTemplates = [
    {
        sku: "PKG-HOME-2",
        title: "Home Basic",
        defaultPrice: 12500,
        // Short tagline default
        defaultTagline: "Essential security for flats & apartments.",
        features: [
            { text: "2x HD Night Vision Cameras", icon: Shield },
            { text: "1x 4-Channel DVR", icon: HardDrive },
            { text: "500GB Hard Disk", icon: HardDrive },
            { text: "Mobile View (Android/iOS)", icon: Smartphone },
            { text: "Installation Included", icon: Check },
        ],
        popular: false,
        color: "blue"
    },
    {
        sku: "PKG-HOME-4",
        title: "Home Standard",
        defaultPrice: 18500,
        defaultTagline: "Complete coverage for independent homes.",
        features: [
            { text: "4x HD Night Vision Cameras", icon: Shield },
            { text: "1x 4-Channel DVR", icon: HardDrive },
            { text: "1TB Hard Disk", icon: HardDrive },
            { text: "Mobile View & Alerts", icon: Smartphone },
            { text: "Installation Included", icon: Check },
            { text: "1 Year On-site Warranty", icon: Zap },
        ],
        popular: true,
        color: "purple"
    },
    {
        sku: "PKG-SHOP-4",
        title: "Shop Secure",
        defaultPrice: 22000,
        defaultTagline: "With Audio Recording for customer interactions.",
        features: [
            { text: "4x HD Audio Cameras", icon: Shield },
            { text: "1x 4-Channel DVR (Audio Support)", icon: HardDrive },
            { text: "1TB Surveillance HDD", icon: HardDrive },
            { text: "Crystal Clear Audio Log", icon: Check },
            { text: "Mobile View", icon: Smartphone },
            { text: "Installation Included", icon: Check },
        ],
        popular: false,
        color: "emerald"
    },
    {
        sku: "PKG-OFFICE-8",
        title: "Office Pro",
        defaultPrice: 42000,
        defaultTagline: "Full premise monitoring for businesses.",
        features: [
            { text: "8x HD Night Vision Cameras", icon: Shield },
            { text: "1x 8-Channel DVR", icon: HardDrive },
            { text: "2TB Storage", icon: HardDrive },
            { text: "Central Monitoring Capable", icon: Check },
            { text: "Advanced Motion Alerts", icon: Zap },
            { text: "Priority Support", icon: Check },
        ],
        popular: false,
        color: "orange"
    }
];

interface PackagesProps {
    products?: Product[]; // Pass standard Product[], we will filter by SKU
}

export function Packages({ products = [] }: PackagesProps) {

    // Helper to format price
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <section id="packages" className="py-24 bg-slate-50 dark:bg-black relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
                    >
                        Popular <span className="text-blue-600">Packages</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 dark:text-slate-400"
                    >
                        Transparent pricing for standard setups. No hidden costs.
                        Includes professional installation and warranty.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {packageTemplates.map((pkg, index) => {
                        // Find matching live product
                        // We match by SKU mostly, or could match by Title if simpler? SKU is safer.
                        // Assuming the "products" array has a 'sku' field. 
                        // Wait, our Product interface in `data/products.ts` might not have SKU visible or mapped nicely from Zoho? 
                        // Let's check `zoho-inventory.ts`. It maps `sku` from Zoho to... it's not in the standard Product interface?
                        // Actually `zoho-inventory.ts` mapping: `id`, `name`, `description`, `price`... 
                        // It doesn't seem to map SKU to the `Product` type explicitly in the `return` object in `getZohoProducts`.
                        // Let's rely on matching by ID or just simply Name if SKU isn't available?
                        // OR: We update Product interface. 
                        // For now, let's try to match by Name loosely OR strict SKU if I add it.
                        // Let's stick to using the `price` if we find a product with the same Name?
                        // Or better: Let's assume the user will name them exactly "Home Basic (2 Cam)" etc?
                        // No, SKU is best. I should add `sku` to the Product interface or just cast it.

                        // For this implementation, I will assume we might match by NAME if SKU is missing
                        // or better yet, I will update the Product type in a follow up.
                        // For now, let's use a lookup.

                        // Let's try to find by Name containing the "Home Basic" string?
                        const liveProduct = products.find(p =>
                            p.name.toLowerCase().includes(pkg.title.toLowerCase())
                            // || p.sku === pkg.sku
                        );

                        const finalPrice = liveProduct?.price || pkg.defaultPrice;
                        // Use Zoho description if it exists and is short (< 100 chars), else default tagline
                        const finalTagline = (liveProduct?.description && liveProduct.description.length < 100)
                            ? liveProduct.description
                            : pkg.defaultTagline;

                        return (
                            <motion.div
                                key={pkg.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 ${pkg.popular
                                        ? "bg-white dark:bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 z-10 scale-105"
                                        : "bg-slate-50 dark:bg-slate-900/50 border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:shadow-lg"
                                    }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{pkg.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 h-10 line-clamp-2">
                                        {finalTagline}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                            {formatPrice(finalPrice)}
                                        </span>
                                        <span className="text-slate-400 text-sm font-medium">approx</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Includes Installation + HDD</p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                            <feature.icon className={`w-5 h-5 shrink-0 ${pkg.popular ? "text-blue-500" : "text-slate-400"
                                                }`} />
                                            <span>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/#contact" // Could open a modal or whatsapp
                                    className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${pkg.popular
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-blue-500"
                                        }`}
                                >
                                    Get Quote
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-500 mb-6">Need a custom solution for a Factory, Society, or Warehouse?</p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all group"
                    >
                        Request Custom Quote <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
