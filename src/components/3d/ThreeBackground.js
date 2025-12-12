"use client";

import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import FloatingElement from './FloatingElement';
import { Suspense, useEffect, useState } from 'react';

export default function ThreeBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            opacity: 0.6 // Subtle background
        }}>
            <Canvas gl={{ alpha: true, antialias: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bd00ff" />

                <Suspense fallback={null}>
                    {/* Background Stars/Particles */}
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    {/* Floating Vape Bots */}
                    <FloatingElement type="bot" position={[-4, 2, -5]} color="#00ffcc" floatSpeed={1.5} />
                    <FloatingElement type="bot" position={[5, -3, -8]} color="#ff00cc" floatSpeed={1.2} />

                    {/* Floating Vape Devices */}
                    <FloatingElement type="device" position={[6, 3, -10]} color="#ff9900" floatSpeed={0.8} />
                    <FloatingElement type="device" position={[-6, -2, -6]} color="#0099ff" floatSpeed={1} />
                    <FloatingElement type="device" position={[0, 4, -15]} color="#ff0000" floatSpeed={0.5} />
                    <FloatingElement type="device" position={[3, 0, -20]} color="#ffff00" floatSpeed={0.7} />
                    <FloatingElement type="device" position={[-2, -4, -12]} color="#00ff00" floatSpeed={0.9} />

                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
