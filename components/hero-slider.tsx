"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Slide {
    type: "video" | "image";
    src: string;
    title: string;
    description: string;
    cta1?: { text: string; href: string };
    cta2?: { text: string; href: string };
}

const slides: Slide[] = [
    {
        type: "video",
        src: "/videos/Hero_Page_Video_Generation.mp4",
        title: "Welcome to VapeNova",
        description: "Discover premium vapes, vaporizers, and gummies. Your trusted source for quality vaping products.",
        cta1: { text: "Shop Now", href: "/shop" },
        cta2: { text: "Learn More", href: "/about" },
    },
    {
        type: "image",
        src: "/images/hero/vaping-lifestyle.png",
        title: "Premium Vaping Experience",
        description: "Explore our curated collection of industry-leading brands and cutting-edge devices.",
        cta1: { text: "View Collection", href: "/shop" },
        cta2: { text: "Our Story", href: "/about" },
    },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-advance slides
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000); // Change slide every 8 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 z-0"
                >
                    {slides[currentSlide].type === "video" ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            key={slides[currentSlide].src}
                        >
                            <source src={slides[currentSlide].src} type="video/mp4" />
                        </video>
                    ) : (
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slides[currentSlide].src})` }}
                        />
                    )}

                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
                </motion.div>
            </AnimatePresence>

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20 z-[1]"></div>

            {/* Hero Content Overlay with Glassmorphism */}
            <div className="container mx-auto px-4 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        {/* Glassmorphism card */}
                        <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent drop-shadow-2xl">
                                {slides[currentSlide].title}
                            </h1>
                            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
                                {slides[currentSlide].description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {slides[currentSlide].cta1 && (
                                    <Link href={slides[currentSlide].cta1!.href}>
                                        <Button size="lg" className="text-lg px-8 py-6 shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all">
                                            {slides[currentSlide].cta1!.text}
                                        </Button>
                                    </Link>
                                )}
                                {slides[currentSlide].cta2 && (
                                    <Link href={slides[currentSlide].cta2!.href}>
                                        <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-black/30 backdrop-blur-sm border-2 shadow-xl hover:bg-black/50 transition-all">
                                            {slides[currentSlide].cta2!.text}
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 border border-white/20"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 border border-white/20"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                                ? "w-12 h-3 bg-white"
                                : "w-3 h-3 bg-white/50 hover:bg-white/70"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
