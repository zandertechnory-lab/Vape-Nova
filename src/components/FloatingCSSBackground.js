"use client";

import { useEffect, useState } from 'react';
import styles from './FloatingCSSBackground.module.css';

// Realistic Vape Shape (Box Mod Style)
const VapeShape1 = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#888" />
                <stop offset="20%" stopColor="#ccc" />
                <stop offset="50%" stopColor="#eee" />
                <stop offset="80%" stopColor="#aaa" />
                <stop offset="100%" stopColor="#666" />
            </linearGradient>
            <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#000" />
                <stop offset="100%" stopColor="#222" />
            </linearGradient>
            <linearGradient id="tankGlass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
        </defs>

        {/* Device Body */}
        <rect x="25" y="30" width="50" height="65" rx="5" fill="url(#metalGradient)" stroke="#555" strokeWidth="1" />
        {/* Screen */}
        <rect x="35" y="40" width="30" height="20" rx="2" fill="url(#screenGradient)" />
        <text x="50" y="53" fontSize="8" fill="#00ffff" textAnchor="middle" fontFamily="monospace">IOOW</text>
        {/* Buttons */}
        <circle cx="50" cy="70" r="5" fill="#333" stroke="#111" />
        <circle cx="40" cy="82" r="3" fill="#333" stroke="#111" />
        <circle cx="60" cy="82" r="3" fill="#333" stroke="#111" />

        {/* Tank Base */}
        <rect x="35" y="25" width="30" height="5" fill="#444" />
        {/* Tank Glass */}
        <rect x="35" y="5" width="30" height="20" fill="url(#tankGlass)" stroke="#ccc" strokeWidth="0.5" />
        <rect x="42" y="5" width="16" height="20" fill="#f0a500" opacity="0.6" /> {/* Liquid */}
        {/* Drip Tip */}
        <rect x="45" y="0" width="10" height="5" fill="#111" />
    </svg>
);

// Realistic Vape Shape (Pod/Pen Style)
const VapeShape2 = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="penGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#444" />
                <stop offset="30%" stopColor="#888" />
                <stop offset="50%" stopColor="#aaa" />
                <stop offset="70%" stopColor="#888" />
                <stop offset="100%" stopColor="#444" />
            </linearGradient>
            <radialGradient id="ledLight" cx="50%" cy="80%" r="50%">
                <stop offset="0%" stopColor="#00ff00" stopOpacity="1" />
                <stop offset="100%" stopColor="#00ff00" stopOpacity="0" />
            </radialGradient>
        </defs>

        {/* Body */}
        <rect x="40" y="10" width="20" height="80" rx="10" fill="url(#penGradient)" />

        {/* Mouthpiece */}
        <path d="M40 10 L50 2 L60 10" fill="#111" />

        {/* LED Indicator */}
        <circle cx="50" cy="80" r="3" fill="url(#ledLight)" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Pattern/Logo stick */}
        <rect x="45" y="30" width="10" height="40" fill="rgba(0,0,0,0.2)" rx="2" />
    </svg>
);

// Realistic Cloud Shape
const CloudShape = ({ className, style }) => (
    <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="cloudGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#fff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
        </defs>

        <circle cx="30" cy="50" r="20" fill="url(#cloudGradient)" />
        <circle cx="50" cy="40" r="25" fill="url(#cloudGradient)" />
        <circle cx="70" cy="50" r="22" fill="url(#cloudGradient)" />
        <circle cx="50" cy="60" r="20" fill="url(#cloudGradient)" />
    </svg>
);


export default function FloatingCSSBackground() {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        // Generate random elements on the client
        const newElements = Array.from({ length: 15 }).map((_, i) => {
            const sizeClass = Math.random() > 0.7 ? styles.large : Math.random() > 0.4 ? styles.medium : styles.small;
            const animClass = Math.random() > 0.5 ? styles.animFloatUp : styles.animFloatDown;

            // Bias towards Vapes for "characters" feel
            const Component = Math.random() > 0.4 ? VapeShape1 : Math.random() > 0.2 ? VapeShape2 : CloudShape;

            return {
                id: i,
                Component,
                className: `${styles.floatingItem} ${sizeClass} ${animClass}`,
                style: {
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${20 + Math.random() * 25}s`,
                    animationDelay: `-${Math.random() * 20}s`,
                }
            };
        });
        setElements(newElements);
    }, []);

    return (
        <div className={styles.container}>
            {elements.map(({ id, Component, className, style }) => (
                <Component key={id} className={className} style={style} />
            ))}
        </div>
    );
}
