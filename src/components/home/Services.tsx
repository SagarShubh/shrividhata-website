"use client";

import { motion } from "framer-motion";
import { Camera, Server, Wifi, Fingerprint, Lock, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: <Camera />,
        title: "CCTV Installation",
        description: "HD & IP Camera setup for crystal clear surveillance.",
        slug: "cctv-installation",
    },
    {
        icon: <Server />,
        title: "DVR/NVR Configuration",
        description: "Reliable recording systems with remote access setup.",
        slug: "dvr-nvr-configuration",
    },
    {
        icon: <Wifi />,
        title: "Networking Solutions",
        description: "Complete structured cabling and Wi-Fi setup for coverage.",
        slug: "networking-solutions",
    },
    {
        icon: <Fingerprint />,
        title: "Biometric Access",
        description: "Advanced fingerprint and face recognition entry systems.",
        slug: "biometric-access",
    },
    {
        icon: <Lock />,
        title: "Video Door Phones",
        description: "See who's at your door before you open it.",
        slug: "video-door-phones",
    },
    {
        icon: <Wrench />,
        title: "Maintenance AMC",
        description: "Annual maintenance contracts for worry-free security.",
        slug: "maintenance-amc",
    },
];

export function Services() {
    return (
        <section id="services" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Our Services
                    </h2>
                    <p className="text-lg text-slate-600">
                        Comprehensive security solutions for residential, commercial, and industrial needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Link key={index} href={`/services/${service.slug}`} className="block h-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col cursor-pointer border border-slate-100"
                            >
                                <div className="w-14 h-14 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <div className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                                    {service.description}
                                </p>
                                <div className="flex items-center text-primary font-bold text-sm">
                                    Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
