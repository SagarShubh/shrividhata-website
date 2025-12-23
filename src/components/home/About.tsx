"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Users, Clock } from "lucide-react";
import Image from "next/image";

const stats = [
    { label: "Years Experience", value: "10+", icon: <Clock className="w-5 h-5" /> },
    { label: "Happy Clients", value: "500+", icon: <Users className="w-5 h-5" /> },
    { label: "Certified Engineers", value: "15+", icon: <ShieldCheck className="w-5 h-5" /> },
    { label: "Projects Done", value: "1000+", icon: <Award className="w-5 h-5" /> },
];

export function About() {
    return (
        <section id="about" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="aspect-[4/5] bg-slate-200 relative">
                                {/* Use an image from public if available, or generate one */}
                                <Image
                                    src="/hero-bg.png"
                                    alt="About ShriVidhata"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/10 rounded-2xl -z-0" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-0" />

                        <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/20 z-20">
                            <p className="text-slate-800 font-medium italic">
                                "Our mission is to provide peace of mind through state-of-the-art security technology and unmatched service excellence."
                            </p>
                            <p className="mt-4 text-primary font-bold">— ShriVidhata Team</p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary mb-6">
                            <span className="text-xs font-bold uppercase tracking-wider">About Our Company</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Leading the Way in <span className="text-primary">Security Innovation</span>
                        </h2>

                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-10">
                            <p>
                                At ShriVidhata, we believe that security is not just about cameras and locks; it&apos;s about safety, trust, and peace of mind. Since our inception, we have been committed to delivering premium security solutions tailored to the unique needs of our clients.
                            </p>
                            <p>
                                We specialize in high-definition surveillance systems, biometric access controls, and integrated security management. Our team of certified professionals ensures that every installation meets the highest standards of quality and reliability.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all">
                                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                        <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
