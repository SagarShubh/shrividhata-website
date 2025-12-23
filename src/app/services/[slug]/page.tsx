"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Camera, Server, Wifi, Fingerprint, Lock, Wrench,
    CheckCircle2, ArrowLeft, ShieldCheck, Zap, Cog
} from "lucide-react";
import Link from "next/link";

const serviceDetails = {
    "cctv-installation": {
        title: "CCTV Installation & Surveillance",
        icon: <Camera className="w-12 h-12" />,
        description: "Professional HD & IP camera setup for homes, offices, and industrial premises.",
        longDescription: "Our comprehensive CCTV solutions go beyond simple monitoring. We provide end-to-end surveillance systems that offer peace of mind through crystal-clear imaging and smart features.",
        features: [
            "4K Ultra HD Resolution",
            "Color Night Vision",
            "AI Human & Vehicle Detection",
            "Mobile App Integration for Remote Live View",
            "Hard Drive Storage Management",
            "Weatherproof Outdoor Cameras"
        ],
        process: [
            { title: "Site Survey", desc: "Detailed inspection to identify blind spots." },
            { title: "System Design", desc: "Custom configuration based on your security needs." },
            { title: "Professional Installation", desc: "Neat cabling and strategic camera placement." },
            { title: "Testing & Handover", desc: "Final testing and mobile app setup for the client." }
        ]
    },
    "dvr-nvr-configuration": {
        title: "DVR/NVR Technical Setup",
        icon: <Server className="w-12 h-12" />,
        description: "Reliable recording systems with remote access and cloud backup options.",
        longDescription: "The brain of your surveillance system requires expert configuration to ensure 24/7 reliability and efficient storage management.",
        features: [
            "Centralized Monitoring System (CMS)",
            "Motion-triggered Recording",
            "Remote Playback on Smartphone",
            "Hard Drive Health Monitoring",
            "Secure Cloud Backup Integration",
            "Backup Power (UPS) Provisioning"
        ],
        process: [
            { title: "Hardware Selection", desc: "Choosing the right recorder for your camera count." },
            { title: "Network Configuration", desc: "Port forwarding and static IP setup for remote access." },
            { title: "Storage Optimization", desc: "Setting up efficient H.265+ compression." },
            { title: "Security Hardening", desc: "Firmware updates and strong password policies." }
        ]
    },
    "networking-solutions": {
        title: "Structured Networking & Wi-Fi",
        icon: <Wifi className="w-12 h-12" />,
        description: "Complete structured cabling and high-speed Wi-Fi setup for seamless coverage.",
        longDescription: "A robust security system depends on a stable network. We provide enterprise-grade networking solutions for homes and businesses.",
        features: [
            "Cat6/Cat7 Structured Cabling",
            "Gigabit Fiber Optic Setup",
            "Mesh Wi-Fi for Zero Dead Zones",
            "Network Rack & Patch Panel Installation",
            "Firewall & Network Security",
            "Bandwidth Management"
        ],
        process: [
            { title: "Network Audit", desc: "Analyzing current coverage and identifying requirements." },
            { title: "Cable Management", desc: "Professional routing of data cables." },
            { title: "Equipment Setup", desc: "Configuring routers, switches, and access points." },
            { title: "Performance Testing", desc: "Speed tests and signal strength verification." }
        ]
    },
    "biometric-access": {
        title: "Biometric & Access Control",
        icon: <Fingerprint className="w-12 h-12" />,
        description: "Advanced fingerprint, card, and face recognition systems for restricted entry.",
        longDescription: "Control who enters your premises with cutting-edge biometric technology that integrates with attendance management.",
        features: [
            "Face Recognition Terminals",
            "Fingerprint & Card Access",
            "Time & Attendance Software",
            "Electromagnetic Door Locks",
            "Mobile App Entry Provision",
            "Emergency Override Systems"
        ],
        process: [
            { title: "Endpoint Selection", desc: "Choosing between facial, finger, or card readers." },
            { title: "Software Integration", desc: "Setting up the management console." },
            { title: "Hardware Installation", desc: "Mounting locks and terminals securely." },
            { title: "User Enrollment", desc: "Registering staff/residents into the system." }
        ]
    },
    "video-door-phones": {
        title: "Video Door Phone Systems",
        icon: <Lock className="w-12 h-12" />,
        description: "Screen visitors and communicate securely before allowing entry.",
        longDescription: "Enhance your front door security with high-definition video communication between you and your visitors.",
        features: [
            "HD Video Intercom",
            "Two-way Audio Communication",
            "Mobile Redirect for Doorbell",
            "Automatic Door Release",
            "Photo/Video Logging of Visitors",
            "Multi-Indoor Monitor Setup"
        ],
        process: [
            { title: "Site Assessment", desc: "Determining best placement for indoor and outdoor units." },
            { title: "Wiring Setup", desc: "Intercom cabling and lock power connection." },
            { title: "Component Mounting", desc: "Professional installation of monitors and call stations." },
            { title: "User Training", desc: "Showing the family how to use the full system." }
        ]
    },
    "maintenance-amc": {
        title: "Annual Maintenance (AMC)",
        icon: <Wrench className="w-12 h-12" />,
        description: "Consistent support and regular checkups for worry-free security.",
        longDescription: "Ensure your security system never fails when you need it most with our comprehensive proactive maintenance plans.",
        features: [
            "Quarterly Preventive Maintenance",
            "Camera Lens Cleaning & Focus Adjustment",
            "Hard Drive & Recording Health Check",
            "Cabling Integrity Inspection",
            "Emergency On-site Support",
            "No Service Charges for AMC clients"
        ],
        process: [
            { title: "Contract Setup", desc: "Defining the scope and frequency of visits." },
            { title: "Initial Inspection", desc: "Baslining the system's current health." },
            { title: "Scheduled Visits", desc: "Regular technical checkups." },
            { title: "Performance Reports", desc: "Providing summary of maintenance activities." }
        ]
    }
};

export default function ServicePage() {
    const params = useParams();
    const slug = params.slug as string;
    const service = serviceDetails[slug as keyof typeof serviceDetails];

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
                    <Link href="/#services" className="text-primary hover:underline flex items-center justify-center">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
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
                    href="/#services"
                    className="inline-flex items-center text-slate-600 hover:text-primary transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to All Services
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-20 h-20 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-8 border border-blue-100">
                                {service.icon}
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                {service.longDescription}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Features */}
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <ShieldCheck className="w-6 h-6 mr-3 text-emerald-500" /> Key Features
                                </h3>
                                <ul className="space-y-4">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-slate-700">
                                            <CheckCircle2 className="w-5 h-5 mr-3 text-blue-500 shrink-0 mt-0.5" />
                                            <span className="font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Why Choose Us for this service */}
                            <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <h3 className="text-2xl font-bold mb-6 flex items-center">
                                    <Zap className="w-6 h-6 mr-3 text-yellow-300" /> Why Us?
                                </h3>
                                <div className="space-y-4 text-blue-50">
                                    <p className="leading-relaxed">
                                        We specialize in {service.title} with over 10 years of experience in Narsinghgarh and surrounding regions.
                                    </p>
                                    <p className="leading-relaxed font-semibold">
                                        Expert Technicians • Authorized Partners • 24/7 Support
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Implementation Process */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                                <Cog className="w-6 h-6 mr-3 text-slate-500 animate-spin-slow" /> Our Process
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {service.process.map((step, idx) => (
                                    <div key={idx} className="relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
                                        <span className="absolute top-4 right-6 text-4xl font-black text-slate-50">0{idx + 1}</span>
                                        <h4 className="text-lg font-bold text-slate-900 mb-2 relative z-10">{step.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed relative z-10">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Quick Quote Widget */}
                        <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-28 shadow-2xl">
                            <h3 className="text-2xl font-bold mb-4">Interested?</h3>
                            <p className="text-slate-400 mb-8 text-sm">
                                Get a customized quote for your premises today. Our experts will help you choose the best configuration.
                            </p>
                            <Link
                                href="/#contact"
                                className="block w-full py-4 bg-primary text-center rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg"
                            >
                                Get a Free Quote
                            </Link>
                            <div className="mt-8 pt-8 border-t border-slate-800 space-y-4">
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Immediate Support</p>
                                <a href="tel:+918989000247" className="flex items-center text-lg font-bold hover:text-primary transition-colors">
                                    +91 89890 00247
                                </a>
                            </div>
                        </div>

                        {/* Authorized Partner Badge */}
                        <div className="border border-slate-100 p-6 rounded-3xl text-center space-y-4">
                            <p className="text-xs text-slate-500 uppercase font-bold">Authorized Partner</p>
                            <div className="flex justify-center gap-4">
                                <div className="p-2 bg-slate-50 rounded-lg">
                                    <span className="font-bold text-slate-900">HIKVISION</span>
                                </div>
                                <div className="p-2 bg-red-50 rounded-lg">
                                    <span className="font-bold text-red-600 italic">PRAMA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
