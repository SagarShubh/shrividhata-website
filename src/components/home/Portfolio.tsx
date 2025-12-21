"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Placeholder data for portfolio
const projects = [
    {
        title: "Corporate Office Surveillance",
        category: "Commercial",
        description: "Complete IP camera setup for a 5-story office building with centralized monitoring.",
        color: "bg-blue-900",
    },
    {
        title: "Apartment Complex Security",
        category: "Residential",
        description: "Video door phones and gate security implementation for a flexible housing society.",
        color: "bg-slate-800",
    },
    {
        title: "Retail Store Chain",
        category: "Retail",
        description: "Anti-theft camera systems installation across 5 showroom locations.",
        color: "bg-red-900",
    },
];

export function Portfolio() {
    return (
        <section id="portfolio" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Our Work
                    </h2>
                    <p className="text-lg text-slate-600">
                        A glimpse into some of our recent installations and security projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                        >
                            {/* Image Placeholder */}
                            <div className={`h-48 ${project.color} w-full`} />

                            <div className="p-6">
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
                                    {project.category}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                    {project.description}
                                </p>
                                <div className="flex items-center text-secondary font-semibold text-sm">
                                    View Case Study <ExternalLink className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
