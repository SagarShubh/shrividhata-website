'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, LogOut, ExternalLink } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <div className="antialiased">{children}</div>;
    }

    const navItems = [
        // { label: 'Dashboard', href: '/admin', icon: LayoutDashboard }, // Maybe for later
        { label: 'Products', href: '/admin/products', icon: Package },
    ];

    return (
        <div className="flex min-h-screen bg-black text-white selection:bg-purple-500/30">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 h-screen flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="block">
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            ShriVidhata
                        </h1>
                        <span className="text-xs text-white/40 uppercase tracking-widest font-medium">Admin Panel</span>
                    </Link>
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
                            // Clear cookie by calling an API or just simple reload that will fail middleware?
                            // Proper way: API route to logout (delete cookie)
                            document.cookie = 'admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                            window.location.href = '/admin/login';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 bg-[#050505]">
                {children}
            </main>
        </div>
    );
}
