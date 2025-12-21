import Link from "next/link";
import { ShieldCheck, Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg text-white">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tracking-tight text-white leading-none">
                                    SHRIVIDHATA
                                </span>
                                <span className="text-xs font-medium text-slate-400 tracking-wider">
                                    SECURITY SOLUTIONS
                                </span>
                            </div>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-xs">
                            Providing top-tier CCTV surveillance and security solutions for homes and businesses. Authorized dealers for premium global brands.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink href="https://www.facebook.com/ShriVidhata/" icon={<Facebook className="w-5 h-5" />} label="Facebook" />
                            <SocialLink href="https://www.instagram.com/shrividhata_cctv/" icon={<Instagram className="w-5 h-5" />} label="Instagram" />
                            <SocialLink href="mailto:contacts@shrividhta.com" icon={<Mail className="w-5 h-5" />} label="Email" />
                            <SocialLink href="https://wa.me/918989000610" icon={<MessageCircle className="w-5 h-5" />} label="WhatsApp" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/" label="Home" />
                            <FooterLink href="/#about" label="About Us" />
                            <FooterLink href="/#services" label="Services" />
                            <FooterLink href="/#brands" label="Brands" />
                            <FooterLink href="/#portfolio" label="Our Work" />
                            <FooterLink href="/#contact" label="Contact" />
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
                        <ul className="space-y-3">
                            <li className="text-slate-400">CCTV Installation</li>
                            <li className="text-slate-400">Security System Maintenance</li>
                            <li className="text-slate-400">Biometric Access Control</li>
                            <li className="text-slate-400">Video Door Phones</li>
                            <li className="text-slate-400">Home Automation</li>
                            <li className="text-slate-400">Network Cabling</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400">
                                <MapPin className="w-5 h-5 mt-0.5 text-secondary shrink-0" />
                                <span>
                                    Near SBI Udawatganj, Mangalwariya,<br />
                                    Narsinghgarh, Distt Rajgarh, M.P. 465669
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Phone className="w-5 h-5 text-secondary shrink-0" />
                                <a href="tel:+918989004747" className="hover:text-white transition-colors">
                                    +91 89890 04747
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Mail className="w-5 h-5 text-secondary shrink-0" />
                                <a href="mailto:contacts@shrividhta.com" className="hover:text-white transition-colors">
                                    contacts@shrividhta.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© {new Date().getFullYear()} ShriVidhata Creation Services Pvt. Ltd. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-secondary hover:text-white transition-all duration-300"
            aria-label={label}
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <Link href={href} className="text-slate-400 hover:text-secondary transition-colors inline-block">
                {label}
            </Link>
        </li>
    );
}
