"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
    const phoneNumber = "918989000247"; // Updated WhatsApp number
    const message = "Hi, I am interested in ShriVidhata security solutions.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] transition-all duration-300 group"
            title="Chat on WhatsApp"
        >
            <MessageCircle className="w-6 h-6 fill-white" />
            <span className="font-bold text-sm">Chat Now</span>

            {/* Pulsing Outer Ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />

            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
        </motion.a>
    );
}
