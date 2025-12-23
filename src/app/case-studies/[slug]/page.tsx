"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Shield, Target } from "lucide-react";
import Link from "next/link";

const caseStudies = {
    "corporate-office-surveillance": {
        title: "Corporate Office Surveillance",
        category: "Commercial",
        image: "/projects/corporate-office.png",
        description: "Complete IP camera setup for a 5-story office building with centralized monitoring and high-definition recording.",
        problem: "The client needed a scalable surveillance system that could provide full coverage of common areas, elevators, and entry points with centralized access for the security team.",
        solution: "We implemented a high-performance network of AI-powered dome cameras integrated with a central 128-channel NVR. The system includes remote mobile access and real-time motion alerts.",
        results: [
            "100% coverage of critical areas",
            "50% reduction in security personnel patrol time",
            "Enhanced incident response time by 30%",
            "Crystal clear HD recording for legal compliance"
        ],
        details: [
            "64 unit IP Dome Cameras",
            "128 Channel NVR with 40TB Storage",
            "Integrated Video Management System",
            "Power over Ethernet (PoE) Setup"
        ]
    },
    "apartment-complex-security": {
        title: "Apartment Complex Security",
        category: "Residential",
        image: "/projects/apartment-security.png",
        description: "Video door phones and gate security implementation for a luxury housing society with 200+ units.",
        problem: "Unauthorized entry and lack of communication between residents and the main gate were causing security concerns.",
        solution: "Installed a synchronized video intercom system connecting every apartment to the main gate and lobby. Integrated it with a license plate recognition (LPR) system for vehicle entry.",
        results: [
            "Simplified visitor management for residents",
            "Zero unauthorized entries reported since installation",
            "Seamless integration with resident mobile app",
            "Automatic gate opening for registered residents"
        ],
        details: [
            "200+ Indoor Video Intercom Units",
            "Gate Entry Station with LPR",
            "Security Booth Control Center",
            "Mobile App Integration for Residents"
        ]
    },
    "retail-store-chain": {
        title: "Retail Store Chain",
        category: "Retail",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        description: "Anti-theft camera systems installation across 5 showroom locations with centralized loss prevention analytics.",
        problem: "Inventory shrinkage and lack of visibility into store operations across multiple cities.",
        solution: "Deployed discreet high-resolution cameras with heat mapping and people counting capabilities. Centralized all store feeds into a single dashboard for management.",
        results: [
            "25% reduction in inventory shrinkage",
            "Valuable insights into customer footfall and store traffic",
            "Centralized monitoring from the head office",
            "Staff performance monitoring and optimization"
        ],
        details: [
            "Heatmap & People Counting AI",
            "Discreet 4K Cameras",
            "Central Management Software (CMS)",
            "Cloud-based Video Backup"
        ]
    }
};

export default function CaseStudyPage() {
    const params = useParams();
    const slug = params.slug as string;
    const project = caseStudies[slug as keyof typeof caseStudies];

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Project Not Found</h1>
                    <Link href="/" className="text-primary font-semibold flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="pt-24 pb-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/#portfolio"
                    className="inline-flex items-center text-slate-600 hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to Portfolio
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
                            {project.category}
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="space-y-10">
                            {/* Problem */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                    <Target className="w-6 h-6 mr-2 text-red-500" /> The Challenge
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    {project.problem}
                                </p>
                            </div>

                            {/* Solution */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                    <Shield className="w-6 h-6 mr-2 text-blue-500" /> Our Solution
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    {project.solution}
                                </p>
                            </div>

                            {/* Key Deliverables */}
                            <div className="bg-slate-50 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Key Implemented Features</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center text-slate-700">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Image & Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-12"
                    >
                        {/* Project Image */}
                        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Impact/Results */}
                        <div className="bg-slate-900 text-white p-10 rounded-3xl relative overflow-hidden">
                            {/* Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />

                            <h3 className="text-2xl font-bold mb-8 flex items-center">
                                Project Impact
                            </h3>
                            <div className="space-y-6">
                                {project.results.map((result, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <CheckCircle2 className="w-6 h-6 mr-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <p className="text-slate-300 text-lg">{result}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
