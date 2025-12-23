import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                    <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
                </div>

                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Introduction</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Welcome to ShriVidhata Creation Services Pvt. Ltd. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Information Collection</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We collect information you provide directly to us through contact forms, such as your name, email address, and phone number. We also collect usage data through cookies to improve our website experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Use of Information</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            The information we collect is used for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>Providing and maintaining our security services.</li>
                            <li>Responding to your inquiries and providing support.</li>
                            <li>Sending you updates about our services (with your consent).</li>
                            <li>Improving our website and user experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Data Security</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>

                    <div className="pt-12 border-t border-slate-100">
                        <Link href="/" className="text-primary font-bold hover:underline">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
