import Image from "next/image";
import { ShieldCheck, Award, Users, Clock, Target, Lightbulb } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | ShriVidhata Security Solutions",
    description: "Learn about our journey, mission, and the expert team behind ShriVidhata's premium security solutions.",
};

export default function AboutPage() {
    return (
        <main className="bg-white dark:bg-slate-950 min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-20 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-6">
                        Building Trust & Security
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        Since our inception, ShriVidhata has been at the forefront of the security revolution in Madhya Pradesh.
                        We do not just install cameras; we engineer peace of mind for homes, businesses, and communities.
                    </p>
                </div>
            </section>

            {/* Our Mission & Vision */}
            <section className="bg-slate-50 dark:bg-slate-900 py-20 mb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                To provide accessible, high-tech security solutions that empower individuals and organizations
                                to operate without fear. We strive to be the most trusted partner in safety infrastructure.
                            </p>
                        </div>
                        {/* Vision */}
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                To secure India, one premise at a time, by integrating cutting-edge AI technology with
                                reliable hardware, creating a safer future for the next generation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story / Values */}
            <section className="container mx-auto px-4 mb-20">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/hero-bg.png" // Using existing asset as placeholder for team/office
                                alt="ShriVidhata Office"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Choose Us?</h2>
                        <div className="space-y-4">
                            <FeatureRow icon={ShieldCheck} title="Authorized Dealers" description="We are official partners for Hikvision, CP Plus, and Dahua, ensuring genuine products with warranty." />
                            <FeatureRow icon={Users} title="Expert Team" description="Our installation team consists of certified engineers who understand aesthetics and wire concealment." />
                            <FeatureRow icon={Clock} title="24/7 Support" description="Security does not sleep, and neither do we. Our AMC plans come with round-the-clock assistance." />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section (Reused Style) */}
            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <StatItem value="10+" label="Years Experience" />
                        <StatItem value="1000+" label="Projects Completed" />
                        <StatItem value="500+" label="Happy Clients" />
                        <StatItem value="15+" label="Certified Experts" />
                    </div>
                </div>
            </section>
        </main>
    );
}

function FeatureRow({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function StatItem({ value, label }: { value: string, label: string }) {
    return (
        <div className="p-4">
            <div className="text-4xl md:text-5xl font-bold mb-2">{value}</div>
            <div className="text-blue-100 font-medium">{label}</div>
        </div>
    );
}
