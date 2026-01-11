"use client";

import { motion } from "framer-motion";
import {
    MessageSquare,
    Ruler,
    PenTool,
    Wrench,
    Headphones,
    ArrowRight,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const steps = [
    {
        id: 1,
        title: "Discovery & Consultation",
        description: "We start by listening. We understand your specific security concerns, operational needs, and budget to define the perfect scope.",
        icon: MessageSquare,
        details: ["Initial Meeting", "Requirement Analysis", "Budget Planning"]
    },
    {
        id: 2,
        title: "Site Survey & Analysis",
        description: "Our experts visit your premises to identify blind spots, lighting conditions, and cabling routes for optimal coverage.",
        icon: Ruler,
        details: ["Blind Spot Identification", "Cabling Route Planning", "Network Assessment"]
    },
    {
        id: 3,
        title: "Custom Solution Design",
        description: "We don't do one-size-fits-all. We engineer a tailored system architecture that perfectly matches your facility's layout.",
        icon: PenTool,
        details: ["Camera Placement Map", "Storage Calculation", "Product Selection"]
    },
    {
        id: 4,
        title: "Expert Installation",
        description: "Our certified technicians ensure a clean, professional setup with concealed wiring and minimal disruption to your daily operations.",
        icon: Wrench,
        details: ["Neat Cabling", "Device Mounting", "System Configuration"]
    },
    {
        id: 5,
        title: "Training & Support",
        description: "We don't just leave. We train you to use the system and provide ongoing support to ensure your security never falters.",
        icon: Headphones,
        details: ["User Training", "Mobile App Setup", "Annual Maintenance"]
    }
];

export default function ProcessPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-black overflow-hidden pt-24 pb-20">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-6">
                        How We Work
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Security isn't just about buying cameras. It's about a complete lifecycle of trust, precision, and care. Here is how we ensure your peace of mind.
                    </p>
                </motion.div>
            </section>

            {/* Timeline Section */}
            <section className="container mx-auto px-4 max-w-5xl relative">
                {/* Vertical Line Desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/50 to-blue-500/20 transform -translate-x-1/2 rounded-full" />

                <div className="space-y-16 md:space-y-24">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Step Number Badge (Center) */}
                            <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-900 border-4 border-blue-100 dark:border-blue-900 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 md:-translate-y-1/2 shadow-lg">
                                <span className="text-blue-600 font-bold text-lg md:text-xl">{step.id}</span>
                            </div>

                            {/* Content Side */}
                            <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                                }`}>
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-4 ${index % 2 === 0 ? "md:hidden" : "" // Show only on mobile for even, or if desired logic
                                    }`}>
                                    <step.icon size={24} />
                                </div>
                                <div className={`hidden md:inline-flex items-center justify-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 mb-4 ${index % 2 === 0 ? "ml-auto" : "mr-auto"
                                    }`}>
                                    <step.icon size={24} />
                                </div>


                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    {step.description}
                                </p>

                                <ul className={`flex flex-col gap-2 ${index % 2 === 0 ? "md:items-end" : "md:items-start"
                                    }`}>
                                    {step.details.map((detail, i) => (
                                        <li key={i} className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-500">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 md:order-none" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Empty Side for Desktop alignment */}
                            <div className="hidden md:block w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 mt-32 text-center">
                <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-blue-600/30">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

                    <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
                        Ready to Secure Your World?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto relative z-10">
                        Let's start Step 1. Book your free consultation today and experience the difference of a professional security partner.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-full hover:bg-blue-50 hover:scale-105 transition-all shadow-lg relative z-10"
                    >
                        Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
