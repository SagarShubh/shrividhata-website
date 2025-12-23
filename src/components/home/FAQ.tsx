"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Can I view my CCTV footage on my phone from anywhere?",
        answer: "Yes, all our modern IP and HD-Analog systems come with mobile app integration. As long as you have an internet connection, you can view live and recorded footage from anywhere in the world.",
    },
    {
        question: "What is the warranty on your installations?",
        answer: "We provide a 1-year standard warranty on all installations. Most hardware (Hikvision, CP Plus, etc.) comes with a 1-2 year manufacturer warranty which we fully support through our AMC services.",
    },
    {
        question: "How long does a typical home installation take?",
        answer: "A standard 4-8 camera home installation usually takes 1-2 working days, including cabling, camera mounting, and system configuration.",
    },
    {
        question: "Do you provide surveillance for large commercial properties?",
        answer: "Absolutely. We specialize in enterprise-level security solutions, including centralized monitoring for multi-story buildings, industrial plants, and retail chains.",
    },
    {
        question: "What happens during a power cut?",
        answer: "We recommend and install UPS (Uninterruptible Power Supply) systems with our security setups. This ensures your cameras continue recording even during power outages for several hours.",
    },
];

function FAQItem({ question, answer, isOpen, onClick }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void
}) {
    return (
        <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`shrink-0 ml-4 p-2 rounded-full ${isOpen ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Common Questions
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Everything you need to know about our security systems and services.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
