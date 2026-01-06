"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Brands", href: "/#brands" },
    { name: "Shop", href: "/shop" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/#contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 dark:bg-slate-900/90 dark:border-slate-800 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-lg text-white transform group-hover:scale-105 transition-transform duration-300">
                            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary dark:text-white leading-none">
                                SHRIVIDHATA
                            </span>
                            <span className="text-[0.6rem] sm:text-xs font-medium text-gray-500 tracking-wider">
                                SECURITY SOLUTIONS
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 hover:text-secondary dark:text-gray-300 dark:hover:text-red-400 transition-colors"
                                scroll={true}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"
                        >
                            Get a Quote
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg font-medium text-gray-700 hover:text-secondary dark:text-gray-200 dark:hover:text-red-400"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/#contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center px-5 py-3 text-base font-semibold text-white bg-primary rounded-lg hover:bg-blue-800 transition-colors"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
