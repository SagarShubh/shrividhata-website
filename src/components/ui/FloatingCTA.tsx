"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FileText } from "lucide-react";

export function FloatingCTA() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
    const y = useTransform(scrollYProgress, [0.1, 0.2], [20, 0]);

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:block"
        >
            <button
                onClick={scrollToContact}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-2xl hover:bg-blue-800 transition-all flex items-center gap-2 border-2 border-white/20 backdrop-blur-sm"
            >
                <FileText className="w-5 h-5" />
                Request Free Quote
            </button>
        </motion.div>
    );
}
