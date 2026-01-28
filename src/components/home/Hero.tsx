"use client";

import { useState } from "react";
import { LegacyHero } from "./LegacyHero";
import { ProductHero } from "./ProductHero";
import { Settings } from "lucide-react";

export function Hero() {
    const [showLegacy, setShowLegacy] = useState(false);

    return (
        <div className="relative group">
            {/* The Toggle Button (Hidden unless hovered/active) */}
            <button
                onClick={() => setShowLegacy(!showLegacy)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-900/10 text-slate-500 hover:bg-slate-900 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                title={showLegacy ? "Switch to New Hero" : "Switch to Legacy Hero"}
            >
                <Settings className="w-4 h-4" />
            </button>

            {/* Render the selected Hero */}
            {showLegacy ? <LegacyHero /> : <ProductHero />}
        </div>
    );
}
