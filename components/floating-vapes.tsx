"use client";

import { motion } from "framer-motion";

interface VapeDevice {
    id: number;
    type: "pen" | "mod" | "pod";
    color: string;
    accentColor: string;
    size: number;
    position: { top?: string; bottom?: string; left?: string; right?: string };
    rotation: { x: number; y: number; z: number };
    animationClass: string;
}

export default function FloatingVapes() {
    const vapeDevices: VapeDevice[] = [
        // Top row - distributed across width
        { id: 1, type: "pen", color: "#8b5cf6", accentColor: "#06b6d4", size: 35, position: { top: "5%", left: "3%" }, rotation: { x: 20, y: 45, z: 15 }, animationClass: "vape-float-1" },
        { id: 2, type: "pod", color: "#6366f1", accentColor: "#14b8a6", size: 32, position: { top: "8%", left: "15%" }, rotation: { x: 30, y: -30, z: 20 }, animationClass: "vape-float-3" },
        { id: 3, type: "mod", color: "#1f1f1f", accentColor: "#ec4899", size: 40, position: { top: "6%", left: "28%" }, rotation: { x: -15, y: 60, z: -10 }, animationClass: "vape-float-2" },
        { id: 4, type: "pen", color: "#a855f7", accentColor: "#22d3ee", size: 38, position: { top: "10%", left: "42%" }, rotation: { x: -20, y: 90, z: -15 }, animationClass: "vape-float-4" },
        { id: 5, type: "pod", color: "#7c3aed", accentColor: "#06b6d4", size: 33, position: { top: "7%", left: "58%" }, rotation: { x: -25, y: 120, z: -20 }, animationClass: "vape-float-6" },
        { id: 6, type: "mod", color: "#0f0f0f", accentColor: "#f472b6", size: 42, position: { top: "9%", left: "72%" }, rotation: { x: 25, y: -45, z: 10 }, animationClass: "vape-float-5" },
        { id: 7, type: "pen", color: "#9333ea", accentColor: "#0ea5e9", size: 36, position: { top: "11%", left: "88%" }, rotation: { x: 15, y: -60, z: 25 }, animationClass: "vape-float-1" },

        // Upper-middle row
        { id: 8, type: "pod", color: "#5b21b6", accentColor: "#22d3ee", size: 34, position: { top: "22%", left: "8%" }, rotation: { x: 20, y: -90, z: 15 }, animationClass: "vape-float-3" },
        { id: 9, type: "mod", color: "#171717", accentColor: "#ec4899", size: 39, position: { top: "25%", left: "35%" }, rotation: { x: -30, y: 75, z: -5 }, animationClass: "vape-float-2" },
        { id: 10, type: "pen", color: "#7e22ce", accentColor: "#06b6d4", size: 37, position: { top: "20%", left: "65%" }, rotation: { x: -15, y: 45, z: -25 }, animationClass: "vape-float-4" },
        { id: 11, type: "pod", color: "#6d28d9", accentColor: "#14b8a6", size: 35, position: { top: "24%", left: "92%" }, rotation: { x: -20, y: 60, z: -15 }, animationClass: "vape-float-6" },

        // Middle row
        { id: 12, type: "mod", color: "#262626", accentColor: "#f472b6", size: 41, position: { top: "40%", left: "5%" }, rotation: { x: 25, y: -120, z: 10 }, animationClass: "vape-float-5" },
        { id: 13, type: "pen", color: "#8b5cf6", accentColor: "#22d3ee", size: 36, position: { top: "42%", left: "22%" }, rotation: { x: 20, y: 45, z: 15 }, animationClass: "vape-float-1" },
        { id: 14, type: "pod", color: "#6366f1", accentColor: "#06b6d4", size: 33, position: { top: "45%", left: "50%" }, rotation: { x: 30, y: -30, z: 20 }, animationClass: "vape-float-3" },
        { id: 15, type: "mod", color: "#1f1f1f", accentColor: "#ec4899", size: 38, position: { top: "43%", left: "78%" }, rotation: { x: -15, y: 60, z: -10 }, animationClass: "vape-float-2" },

        // Lower-middle row
        { id: 16, type: "pen", color: "#a855f7", accentColor: "#14b8a6", size: 34, position: { top: "60%", left: "12%" }, rotation: { x: -20, y: 90, z: -15 }, animationClass: "vape-float-4" },
        { id: 17, type: "pod", color: "#7c3aed", accentColor: "#22d3ee", size: 37, position: { top: "62%", left: "40%" }, rotation: { x: -25, y: 120, z: -20 }, animationClass: "vape-float-6" },
        { id: 18, type: "mod", color: "#0f0f0f", accentColor: "#f472b6", size: 40, position: { top: "58%", left: "68%" }, rotation: { x: 25, y: -45, z: 10 }, animationClass: "vape-float-5" },

        // Bottom row
        { id: 19, type: "pen", color: "#9333ea", accentColor: "#0ea5e9", size: 35, position: { top: "78%", left: "18%" }, rotation: { x: 15, y: -60, z: 25 }, animationClass: "vape-float-1" },
        { id: 20, type: "pod", color: "#5b21b6", accentColor: "#06b6d4", size: 39, position: { top: "80%", left: "55%" }, rotation: { x: 20, y: -90, z: 15 }, animationClass: "vape-float-3" },
        { id: 21, type: "mod", color: "#171717", accentColor: "#ec4899", size: 36, position: { top: "82%", left: "85%" }, rotation: { x: -30, y: 75, z: -5 }, animationClass: "vape-float-2" },
    ];

    const renderVapeDevice = (device: VapeDevice) => {
        const baseStyle = {
            width: `${device.size}px`,
            height: `${device.size * 2.5}px`,
            transformStyle: "preserve-3d" as const,
            transform: `rotateX(${device.rotation.x}deg) rotateY(${device.rotation.y}deg) rotateZ(${device.rotation.z}deg)`,
        };

        return (
            <div className="vape-3d-container" style={baseStyle}>
                {/* Main body - cylindrical */}
                <div
                    className="vape-body"
                    style={{
                        background: `linear-gradient(135deg, ${device.color} 0%, ${adjustBrightness(device.color, 0.6)} 50%, ${device.color} 100%)`,
                    }}
                >
                    {/* Metallic shine */}
                    <div className="vape-shine" />

                    {/* LED indicator */}
                    <div
                        className="vape-led"
                        style={{
                            background: `radial-gradient(circle, ${device.accentColor} 0%, transparent 70%)`,
                            boxShadow: `0 0 10px ${device.accentColor}, 0 0 20px ${device.accentColor}`,
                        }}
                    />

                    {/* Top cap */}
                    <div
                        className="vape-cap"
                        style={{
                            background: `linear-gradient(135deg, ${adjustBrightness(device.color, 1.3)} 0%, ${device.color} 100%)`,
                        }}
                    />

                    {/* Bottom base */}
                    <div
                        className="vape-base"
                        style={{
                            background: `linear-gradient(135deg, ${device.color} 0%, ${adjustBrightness(device.color, 0.4)} 100%)`,
                        }}
                    />

                    {/* Accent ring */}
                    <div
                        className="vape-ring"
                        style={{
                            background: `linear-gradient(90deg, ${device.accentColor} 0%, ${adjustBrightness(device.accentColor, 1.5)} 50%, ${device.accentColor} 100%)`,
                            boxShadow: `0 0 5px ${device.accentColor}`,
                        }}
                    />
                </div>

                {/* 3D shadow */}
                <div className="vape-shadow" />
            </div>
        );
    };

    // Helper function to adjust color brightness
    const adjustBrightness = (color: string, factor: number): string => {
        const hex = color.replace('#', '');
        const r = Math.min(255, Math.floor(parseInt(hex.substr(0, 2), 16) * factor));
        const g = Math.min(255, Math.floor(parseInt(hex.substr(2, 2), 16) * factor));
        const b = Math.min(255, Math.floor(parseInt(hex.substr(4, 2), 16) * factor));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
            {vapeDevices.map((device, index) => (
                <motion.div
                    key={device.id}
                    className={`absolute ${device.animationClass}`}
                    style={{
                        ...device.position,
                        perspective: "1000px",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.25, scale: 1 }}
                    transition={{
                        duration: 1.5,
                        delay: index * 0.1,
                        ease: "easeOut",
                    }}
                >
                    {renderVapeDevice(device)}
                </motion.div>
            ))}
        </div>
    );
}
