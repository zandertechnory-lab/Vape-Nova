"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        Tawk_API?: any;
        Tawk_LoadStart?: Date;
    }
}

export default function LiveChat() {
    useEffect(() => {
        // Delay chat widget until after page is interactive
        const timer = setTimeout(() => {
            window.Tawk_API = window.Tawk_API || {};
            window.Tawk_LoadStart = new Date();
            const s1 = document.createElement("script");
            const s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/693fce3218f23b1985eda53c/1jcgjqtvj';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode?.insertBefore(s1, s0);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return null;
}
