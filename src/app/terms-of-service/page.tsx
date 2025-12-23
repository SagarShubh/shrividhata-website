import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
    return (
        <div className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                    <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>
                </div>

                <div className="prose prose-slate max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Agreement to Terms</h2>
                        <p className="text-slate-600 leading-relaxed">
                            By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Services Description</h2>
                        <p className="text-slate-600 leading-relaxed">
                            ShriVidhata provides security solutions, including CCTV installation, maintenance, and consultation. Specific service terms are outlined in individual project contracts.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">3. User Responsibilities</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Users are responsible for providing accurate information and ensuring that their use of our security products complies with local laws and regulations regarding privacy and surveillance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Limitation of Liability</h2>
                        <p className="text-slate-600 leading-relaxed">
                            ShriVidhata shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services or products.
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
