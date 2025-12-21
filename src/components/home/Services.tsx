"use client";

import { motion } from "framer-motion";
import { Camera, Server, Wifi, Fingerprint, Lock, Wrench } from "lucide-react";

const services = [
    {
        icon: <Camera />,
        title: "CCTV Installation",
        description: "HD & IP Camera setup for crystal clear surveillance.",
    },
    {
        icon: <Server />,
        title: "DVR/NVR Configuration",
        description: "Reliable recording systems with remote access setup.",
    },
    {
        icon: <Wifi />,
        title: "Networking Solutions",
        description: "Complete structured cabling and Wi-Fi setup for coverage.",
    },
    {
        icon: <Fingerprint />,
        title: "Biometric Access",
        description: "Advanced fingerprint and face recognition entry systems.",
    },
    {
        icon: <Lock />,
        title: "Video Door Phones",
        description: "See who's at your door before you open it.",
    },
    {
        icon: <Wrench />,
        title: "Maintenance AMC",
        description: "Annual maintenance contracts for worry-free security.",
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
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <div className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
