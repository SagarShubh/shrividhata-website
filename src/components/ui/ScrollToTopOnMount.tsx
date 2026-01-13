"use client";

import { useEffect } from "react";

export function ScrollToTopOnMount() {
    useEffect(() => {
        // Prevent browser from restoring scroll position on refresh
        if (typeof window !== "undefined") {
            window.history.scrollRestoration = "manual";
            window.scrollTo(0, 0);
        }
    }, []);

    return null;
}
