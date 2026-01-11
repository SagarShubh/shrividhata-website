import { Contact } from "@/components/home/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | ShriVidhata Security Solutions",
    description: "Get in touch with ShriVidhata for the best CCTV camera installation and security system services in Rajgarh and Madhya Pradesh.",
};

export default function ContactPage() {
    return (
        <main className="pt-24 pb-12 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-6">
                    Contact Us
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Have questions or need a quote? We are here to help you secure your world.
                </p>
            </div>
            <Contact />
        </main>
    );
}
