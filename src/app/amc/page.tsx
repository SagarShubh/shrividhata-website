import { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck, Clock, Wrench, X } from "lucide-react";

export const metadata: Metadata = {
    title: "AMC Plans | Annual Maintenance Contracts",
    description: "Ensure zero downtime with ShriVidhata's Annual Maintenance Contracts. Silver, Gold, and Platinum plans for complete peace of mind.",
};

export default function AMCPage() {
    return (
        <main className="bg-slate-50 dark:bg-black min-h-screen pt-40 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Peace of Mind Packages</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                        Annual Maintenance Contracts (AMC)
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Security systems need regular care to function when it matters most.
                        Choose a plan that guarantees <span className="font-bold text-slate-800 dark:text-slate-200">Zero Downtime</span>.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Silver Plan */}
                    <PricingCard
                        title="Silver"
                        subtitle="Basic Maintenance"
                        price="Starts ₹2,999/yr"
                        features={[
                            { text: "2 Scheduled Visits / Year", check: true },
                            { text: "On-Call Support (Mon-Sat)", check: true },
                            { text: "General Cleaning & Focusing", check: true },
                            { text: "Unlimited Breakdown Calls", check: false },
                            { text: "Spare Parts Included", check: false },
                        ]}
                        color="border-slate-200"
                        headerBg="bg-slate-100 text-slate-700"
                    />

                    {/* Gold Plan */}
                    <PricingCard
                        title="Gold"
                        subtitle="Standard Protection"
                        price="Starts ₹5,999/yr"
                        isPopular={true}
                        features={[
                            { text: "4 Scheduled Visits / Year", check: true },
                            { text: "Priority Support (24hr Response)", check: true },
                            { text: "Deep Cleaning & DVR Health Check", check: true },
                            { text: "Unlimited Breakdown Calls", check: true },
                            { text: "Spare Parts Included", check: false },
                        ]}
                        color="border-amber-400"
                        headerBg="bg-gradient-to-r from-amber-400 to-amber-500 text-white"
                    />

                    {/* Platinum Plan */}
                    <PricingCard
                        title="Platinum"
                        subtitle="Comprehensive Cover"
                        price="Custom Quote"
                        features={[
                            { text: "Monthly Scheduled Visits", check: true },
                            { text: "4-Hour Emergency Response", check: true },
                            { text: "Advanced System Audit", check: true },
                            { text: "Unlimited Breakdown Calls", check: true },
                            { text: "Spare Parts Replacement Included", check: true },
                        ]}
                        color="border-slate-800 dark:border-slate-600"
                        headerBg="bg-slate-900 text-white"
                    />
                </div>

                {/* FAQ / Note */}
                <div className="mt-20 max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <ShieldCheck className="text-green-500" />
                        Why choose comprehensive AMC?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        Electronic components degrade over time due to dust and power fluctuations.
                        Unlike a simple warranty which covers manufacturing defects, our AMC acts like a
                        <span className="font-semibold text-slate-800 dark:text-slate-200"> Health Insurance</span> for your system,
                        ensuring preventative care that extends the life of your expensive hardware by 3-5 years.
                    </p>
                    <Link href="/contact" className="text-blue-600 font-bold hover:underline">
                        Contact us for a tailored proposal for your Society/Factory &rarr;
                    </Link>
                </div>
            </div>
        </main>
    );
}

function PricingCard({ title, subtitle, price, features, color, headerBg, isPopular = false }: any) {
    return (
        <div className={`relative bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border-2 flex flex-col ${color} ${isPopular ? 'shadow-2xl scale-105 z-10' : 'shadow-lg hover:border-slate-300'}`}>
            {isPopular && (
                <div className="bg-amber-500 text-white text-xs font-bold uppercase tracking-wider text-center py-1">
                    Most Popular
                </div>
            )}
            <div className={`p-6 text-center ${headerBg}`}>
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-sm opacity-90 mb-4">{subtitle}</p>
                <div className="text-2xl font-bold bg-white/20 inline-block px-4 py-2 rounded-lg backdrop-blur-sm">
                    {price}
                </div>
            </div>

            <div className="p-8 flex-1">
                <ul className="space-y-4">
                    {features.map((f: any, i: number) => (
                        <li key={i} className={`flex items-start gap-3 text-sm ${f.check ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 line-through decoration-slate-400'}`}>
                            {f.check ? (
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                            ) : (
                                <X className="w-5 h-5 opacity-50 shrink-0" />
                            )}
                            {f.text}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                    href="/contact"
                    className={`block w-full py-3 rounded-xl font-bold text-center transition-all ${isPopular ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30' : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'}`}
                >
                    Choose {title}
                </Link>
            </div>
        </div>
    );
}
