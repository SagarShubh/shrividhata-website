"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
    const phoneNumber = "918989000610"; // Correct WhatsApp number
    const message = "Hi, I am interested in ShriVidhata security solutions.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba5a] transition-colors group"
        >
            <MessageCircle className="w-6 h-6 fill-white" />
            <span className="font-semibold text-sm hidden sm:inline">Chat with Us</span>

            {/* Pulsing effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 -z-10" />
        </motion.a>
    );
}
