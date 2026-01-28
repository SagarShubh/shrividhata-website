"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Save, RefreshCw, AlertCircle, CheckCircle2, Layout, Image as ImageIcon, Tag, Link as LinkIcon, Palette } from "lucide-react";
import { HeroSlide, HERO_THEMES, BRANDS } from "@/lib/hero-types";
import { updateHeroConfigAction } from "./actions";
import heroConfig from "@/data/hero-config.json"; // Initial Data
import { products } from "@/data/products";

export default function HeroEditorPage() {
    const [slides, setSlides] = useState<HeroSlide[]>(heroConfig as HeroSlide[]);
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    const handleSave = () => {
        setStatus({ type: null, message: '' });
        startTransition(async () => {
            const res = await updateHeroConfigAction(slides);
            if (res.success) {
                setStatus({ type: 'success', message: res.message });
            } else {
                setStatus({ type: 'error', message: res.message });
            }
        });
    };

    const updateSlide = (index: number, field: keyof HeroSlide, value: any) => {
        const newSlides = [...slides];
        newSlides[index] = { ...newSlides[index], [field]: value };

        // Auto-fetch product details if productId changes
        if (field === 'productId') {
            const product = products.find(p => p.id === value);
            if (product) {
                // Only autofill if custom fields are empty to avoid overwriting user edits
                if (!newSlides[index].customTitle) newSlides[index].customTitle = product.name;
                if (!newSlides[index].customDescription) newSlides[index].customDescription = product.description.slice(0, 100) + "...";
                if (!newSlides[index].image) newSlides[index].image = product.image;

                // Try to match brand
                if (product.brand) {
                    const brandMatch = BRANDS.find(b => b.value === product.brand);
                    if (brandMatch) newSlides[index].brandLogo = brandMatch.logo;
                }
            }
        }

        setSlides(newSlides);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hero Editor</h1>
                    <p className="text-white/40">Customize the 5 homepage sliders. Save changes locally then push to git.</p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isPending}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isPending
                        ? "bg-white/10 text-white/50 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                        }`}
                >
                    {isPending ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {isPending ? "Saving..." : "Save Configuration"}
                </button>
            </div>

            {status.message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                    {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {status.message}
                </div>
            )}

            <div className="grid gap-6">
                {slides.map((slide, index) => (
                    <div key={slide.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                        {/* Header */}
                        <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/10">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <span className="bg-white/10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono">{index + 1}</span>
                                Slide {index + 1}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${slide.theme === 'dark-tech' ? 'bg-slate-700 text-white' : 'bg-blue-500/20 text-blue-300'
                                    }`}>
                                    {HERO_THEMES[slide.theme].label}
                                </span>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Left Column: Settings */}
                            <div className="space-y-6">
                                {/* Theme Selector */}
                                <div>
                                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Palette className="w-3 h-3" /> Color Impression (Theme)
                                    </label>
                                    <select
                                        value={slide.theme}
                                        onChange={(e) => updateSlide(index, 'theme', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none"
                                    >
                                        {Object.entries(HERO_THEMES).map(([key, theme]) => (
                                            <option key={key} value={key} className="bg-slate-900">{theme.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Product & Brand */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <Tag className="w-3 h-3" /> Brand Logo
                                        </label>
                                        <select
                                            value={BRANDS.find(b => b.logo === slide.brandLogo)?.value || ""}
                                            onChange={(e) => {
                                                const selectedBrand = BRANDS.find(b => b.value === e.target.value);
                                                if (selectedBrand) updateSlide(index, 'brandLogo', selectedBrand.logo);
                                            }}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="" className="bg-slate-900">Select Brand</option>
                                            {BRANDS.map(brand => (
                                                <option key={brand.value} value={brand.value} className="bg-slate-900">{brand.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <LinkIcon className="w-3 h-3" /> Product ID
                                        </label>
                                        <input
                                            type="text"
                                            value={slide.productId}
                                            onChange={(e) => updateSlide(index, 'productId', e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                                            placeholder="e.g. cam-001"
                                        />
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <ImageIcon className="w-3 h-3" /> Image Path / URL
                                    </label>
                                    <input
                                        type="text"
                                        value={slide.image}
                                        onChange={(e) => updateSlide(index, 'image', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Content Preview */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Layout className="w-3 h-3" /> Custom Title
                                    </label>
                                    <input
                                        type="text"
                                        value={slide.customTitle}
                                        onChange={(e) => updateSlide(index, 'customTitle', e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-lg font-bold text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                                        Custom Description
                                    </label>
                                    <textarea
                                        value={slide.customDescription}
                                        onChange={(e) => updateSlide(index, 'customDescription', e.target.value)}
                                        rows={3}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80 focus:outline-none focus:border-blue-500 resize-none"
                                    />
                                </div>

                                {/* Mini Preview */}
                                <div className={`relative h-24 rounded-lg overflow-hidden border border-white/10 flex items-center px-4 ${slide.theme === 'dark-tech' ? 'bg-slate-900' : 'bg-white'
                                    }`}>
                                    <div className="flex-1">
                                        <div className={`text-xs font-bold mb-1 ${slide.theme === 'dark-tech' ? 'text-white' : 'text-slate-900'}`}>{slide.customTitle}</div>
                                        <div className="text-[10px] text-gray-500 truncate">{slide.customDescription}</div>
                                    </div>
                                    <div className="w-16 h-16 relative">
                                        <Image src={slide.image} alt="Preview" fill className="object-contain" />
                                    </div>
                                    <div className="absolute top-2 right-2 w-12 h-4 relative">
                                        <Image src={slide.brandLogo} alt="brand" fill className="object-contain object-right" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
