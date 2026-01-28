'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, LogOut, ExternalLink, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    if (isLoginPage) {
        return <div className="antialiased">{children}</div>;
    }

    const navItems = [
        // { label: 'Dashboard', href: '/admin', icon: LayoutDashboard }, // Maybe for later
        { label: 'Products', href: '/admin/products', icon: Package },
        { label: 'Hero Slides', href: '/admin/hero', icon: LayoutDashboard },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <Link href="/" className="block">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        ShriVidhata
                    </h1>
                    <span className="text-xs text-white/40 uppercase tracking-widest font-medium">Admin Panel</span>
                </Link>
                {/* Close Button for Mobile */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="md:hidden p-2 text-white/40 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-white/10 text-white font-medium'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm group"
                >
                    <ExternalLink className="w-4 h-4 group-hover:text-blue-400" />
                    View Live Site
                </Link>
                <button
                    onClick={async () => {
                        document.cookie = 'admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        window.location.href = '/admin/login';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen bg-black text-white selection:bg-purple-500/30">
            {/* Desktop Sidebar - Hidden on mobile */}
            <aside className="hidden md:flex w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 h-screen flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Header - Visible on mobile only */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <Link href="/" className="block">
                    <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        ShriVidhata
                    </h1>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-white/10 z-50 flex flex-col md:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 min-w-0 bg-[#050505] pt-16 md:pt-0">
                {children}
            </main>
        </div>
    );
}
