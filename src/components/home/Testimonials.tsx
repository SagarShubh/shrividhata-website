"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Rajesh Sharma",
        role: "Business Owner",
        content: "ShriVidhata provided exceptional service for our office security. The installation was quick, and the remote access setup is incredibly reliable.",
        rating: 5,
    },
    {
        name: "Anjali Gupta",
        role: "Homeowner",
        content: "Very professional team. They helped us choose the right cameras for our home. The video quality is crystal clear even at night.",
        rating: 5,
    },
    {
        name: "Vikram Singh",
        role: "Property Manager",
        content: "We've been using their AMC service for two years now. Response time to any issues is very fast. Definitely the best in the region.",
        rating: 5,
    },
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        We pride ourselves on providing top-tier security solutions that keep our customers satisfied and safe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl relative shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-slate-700 dark:text-slate-300 italic mb-8 relative z-10 leading-relaxed">
                                &ldquo;{t.content}&rdquo;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
