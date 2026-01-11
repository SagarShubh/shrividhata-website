import { Metadata } from "next";
import Link from "next/link";
import {
    Cctv,
    Fingerprint,
    MapPin,
    Video,
    Flame,
    Wifi,
    Home,
    ShieldAlert,
    ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
    title: "Our Services | ShriVidhata Security Solutions",
    description: "Explore our comprehensive security services including CCTV, Biometrics, GPS Tracking, and Fire Alarm systems.",
};

const services = [
    {
        title: "CCTV Surveillance",
        description: "High-definition monitoring for homes, offices, and industrial setups. Remote view capable.",
        icon: Cctv,
        color: "text-blue-600",
        bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
        title: "Biometric Access",
        description: "Fingerprint and Face ID systems for secure employee attendance and door access control.",
        icon: Fingerprint,
        color: "text-emerald-600",
        bg: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
        title: "GPS Tracking Solutions",
        description: "Real-time fleet tracking, geofencing, and vehicle security with instant mobile alerts.",
        icon: MapPin,
        color: "text-orange-600",
        bg: "bg-orange-50 dark:bg-orange-900/20",
        new: true
    },
    {
        title: "Video Door Phones",
        description: "See who is at the door before you answer. Two-way audio and smart lock integration.",
        icon: Video,
        color: "text-purple-600",
        bg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
        title: "Fire Alarm Systems",
        description: "Early smoke detection and commercial-grade fire safety alarms for malls and warehouses.",
        icon: Flame,
        color: "text-red-600",
        bg: "bg-red-50 dark:bg-red-900/20"
    },
    {
        title: "Networking & Wi-Fi",
        description: "Structured cabling, long-range APs, and robust networking for seamless connectivity.",
        icon: Wifi,
        color: "text-cyan-600",
        bg: "bg-cyan-50 dark:bg-cyan-900/20"
    },
    {
        title: "Home Automation",
        description: "Smart lighting, curtains, and voice control. Turn your house into a smart home.",
        icon: Home,
        color: "text-indigo-600",
        bg: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
        title: "Intrusion Detection",
        description: "Laser sensors and motion detectors that trigger loud alarms to prevent theft.",
        icon: ShieldAlert,
        color: "text-rose-600",
        bg: "bg-rose-50 dark:bg-rose-900/20"
    }
];

export default function ServicesPage() {
    return (
        <main className="bg-slate-50 dark:bg-black min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        Complete <span className="text-primary">Security Ecosystem</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        From basic surveillance to advanced fleet tracking, we cover every aspect of your safety.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 group relative overflow-hidden">
                            {service.new && (
                                <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full animate-pulse">
                                    New
                                </span>
                            )}

                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${service.bg} ${service.color}`}>
                                <service.icon className="w-7 h-7" />
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                {service.description}
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center text-sm font-semibold text-primary hover:gap-2 transition-all"
                            >
                                Enquire Now <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 text-center bg-blue-600 rounded-3xl p-10 text-white shadow-xl shadow-blue-600/20">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Not sure what you need?</h2>
                    <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                        Our experts can conduct a free site survey to recommend the perfect solution for your budget.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
                    >
                        Book Free Survey
                    </Link>
                </div>
            </div>
        </main>
    );
}
