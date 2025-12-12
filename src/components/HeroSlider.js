"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import styles from './HeroSlider.module.css';
import Button from './Button';

const slides = [
    {
        id: 1,
        image: '/slides/slide1.png',
        title: 'Premium Vaping Experience',
        subtitle: 'Discover our curated collection of top-tier devices',
        link: '/shop'
    },
    {
        id: 2,
        image: '/slides/slide2.png',
        title: 'Latest Technology',
        subtitle: 'Experience the future of vaporization',
        link: '/shop?category=desktop'
    },
    {
        id: 3,
        image: '/slides/slide3.png',
        title: 'Portable Excellence',
        subtitle: 'Power and performance in the palm of your hand',
        link: '/shop?category=portable'
    },
    {
        id: 4,
        image: '/slides/slide4.png',
        title: 'Premium E-Liquids',
        subtitle: 'Explore our wide range of delicious flavors',
        link: '/shop?category=e-liquids'
    },
    {
        id: 5,
        image: '/slides/slide5.png',
        title: 'Accessories & More',
        subtitle: 'Everything you need to maintain your device',
        link: '/shop?category=accessories'
    }
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <div
            className={styles.slider}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className={styles.image}
                    />
                    <div className={styles.content}>
                        <h1 className={styles.title}>{slide.title}</h1>
                        <p className={styles.subtitle}>{slide.subtitle}</p>
                        <Link href={slide.link}>
                            <Button variant="primary" size="lg">
                                Shop Now <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}

            <button className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide}>
                <ChevronLeft size={24} />
            </button>
            <button className={`${styles.arrow} ${styles.next}`} onClick={nextSlide}>
                <ChevronRight size={24} />
            </button>

            <div className={styles.controls}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
}

