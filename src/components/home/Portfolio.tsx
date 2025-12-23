"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Placeholder data for portfolio
const projects = [
    {
        title: "Corporate Office Surveillance",
        category: "Commercial",
        description: "Complete IP camera setup for a 5-story office building with centralized monitoring.",
        image: "/projects/corporate-office.png",
        slug: "corporate-office-surveillance",
    },
    {
        title: "Apartment Complex Security",
        category: "Residential",
        description: "Video door phones and gate security implementation for a flexible housing society.",
        image: "/projects/apartment-security.png",
        slug: "apartment-complex-security",
    },
    {
        title: "Retail Store Chain",
        category: "Retail",
        description: "Anti-theft camera systems installation across 5 showroom locations.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        slug: "retail-store-chain",
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
                            {/* Project Image */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white text-sm font-medium flex items-center">
                                        View Details <ExternalLink className="w-4 h-4 ml-2" />
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
                                    {project.category}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                <Link
                                    href={`/case-studies/${project.slug}`}
                                    className="flex items-center text-secondary font-semibold text-sm hover:text-secondary/80 transition-colors"
                                >
                                    View Case Study <ExternalLink className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
