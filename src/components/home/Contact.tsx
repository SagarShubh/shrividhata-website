"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Phone, Mail, MapPin } from "lucide-react";

export function Contact() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                alert("Something went wrong. Please try again or call us directly.");
            }
        } catch (error) {
            console.error(error);
            alert("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                            Get In Touch
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Ready to secure your premises? Contact us for a free consultation and quote. We are here to answer any questions you may have.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
                                    <p className="text-slate-600">+91 89890 00247</p>
                                    <p className="text-slate-500 text-sm">Mon-Sat 9am to 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0 text-secondary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Email</h3>
                                    <p className="text-slate-600">contacts@shrividhta.com</p>
                                    <p className="text-slate-500 text-sm">Online support 24/7</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">Office</h3>
                                    <p className="text-slate-600">Shop No. 2, Near SBI Udawatganj, Mangalwariya, Narsinghgarh, Distt Rajgarh, M.P. 465669</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                <p className="text-slate-600">Thank you for reaching out. We will get back to you shortly.</p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="mt-6 text-primary font-semibold hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                        <input required type="text" name="name" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                                        <input required type="tel" name="phone" id="phone" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Your Phone" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                    <input required type="email" name="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                    <textarea required name="message" id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="How can we help you?" />
                                </div>
                                <button disabled={loading} type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-20 w-full overflow-hidden rounded-3xl h-[400px] border border-slate-200 shadow-inner">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6507.283817058164!2d77.0874988!3d23.7041234!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397b7b4160b28e3f%3A0x465f1377ed94a5fe!2sSHRI%20VIDHATA%20CREATION%20SERVICES%20OPC%20PVT.%20LTD%20(SUB%20REGIONAL%20DISTRIBUTOR%20OF%20HIKVISION%20AND%20PRAMA)HIKVISION%20CCTV%20CAMERA%20CP%20PLUS!5e1!3m2!1sen!2sin!4v1766506835836!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="ShriVidhata Location"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
