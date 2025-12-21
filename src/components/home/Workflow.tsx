"use client";

import { motion } from "framer-motion";
import { ClipboardList, Settings, ShieldCheck, Headphones } from "lucide-react";

const steps = [
    {
        icon: <ClipboardList className="w-8 h-8 text-secondary" />,
        title: "Site Survey",
        description: "We visit your location to assess security risks and optimal camera placement.",
    },
    {
        icon: <Settings className="w-8 h-8 text-secondary" />,
        title: "Custom Solution",
        description: "We design a tailored security plan that fits your specific needs and budget.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
        title: "Expert Installation",
        description: "Our certified technicians handle the wiring and setup with precision.",
    },
    {
        icon: <Headphones className="w-8 h-8 text-secondary" />,
        title: "Support & Maintenance",
        description: "We provide ongoing support and maintenance to ensure 24/7 reliability.",
    },
];

export function Workflow() {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        How We Work
                    </h2>
                    <p className="text-lg text-slate-600">
                        From consultation to installation, we ensure a seamless experience for every client.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6 mx-auto">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 text-center mb-3">
                                {step.title}
                            </h3>
                            <p className="text-slate-600 text-center leading-relaxed">
                                {step.description}
                            </p>

                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200 transform -translate-y-1/2" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
