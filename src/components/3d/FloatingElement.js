"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function VapeBot({ color = "#8A2BE2", position }) {
    return (
        <group position={position}>
            {/* Head */}
            <mesh position={[0, 1.2, 0]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.15, 1.3, 0.3]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.15, 1.3, 0.3]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 1.5, 32]} />
                <meshStandardMaterial color="#4a90e2" metalness={0.6} roughness={0.2} />
            </mesh>
            {/* Arms */}
            <mesh position={[-0.4, 0.2, 0]} rotation={[0, 0, 0.5]}>
                <capsuleGeometry args={[0.1, 0.8, 4, 8]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[0.4, 0.2, 0]} rotation={[0, 0, -0.5]}>
                <capsuleGeometry args={[0.1, 0.8, 4, 8]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            {/* Vape Cloud */}
            <mesh position={[0.5, 0.6, 0.2]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <MeshDistortMaterial color="white" transparent opacity={0.6} distort={0.5} speed={2} />
            </mesh>
        </group>
    );
}

function VapeDevice({ color = "#FF1493", position }) {
    return (
        <group position={position} rotation={[0.5, 0.5, 0]}>
            {/* Mod Body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.5, 1, 0.3]} />
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.1} />
            </mesh>
            {/* Tank */}
            <mesh position={[0, 0.7, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
                <meshPhysicalMaterial color="white" transparent opacity={0.4} roughness={0} metalness={0.9} transmission={0.9} />
            </mesh>
            {/* Drip Tip */}
            <mesh position={[0, 1.05, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
                <meshStandardMaterial color="black" />
            </mesh>
            {/* Screen/Buttons */}
            <mesh position={[0, 0.2, 0.16]}>
                <planeGeometry args={[0.3, 0.4]} />
                <meshStandardMaterial color="black" emissive="#00ffff" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

export default function FloatingElement({ type = 'bot', position, rotationSpeed = 0.5, floatSpeed = 1, color }) {
    const groupRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005 * rotationSpeed;
            groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={groupRef}>
                {type === 'bot' ? <VapeBot color={color} position={position} /> : <VapeDevice color={color} position={position} />}
            </group>
        </Float>
    );
}
