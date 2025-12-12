"use client";

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Verified Customer",
        rating: 5,
        text: "Best vaporizer shop I've ever used! The Mighty+ I purchased is absolutely incredible. Fast shipping and excellent customer service.",
        image: null
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Verified Customer",
        rating: 5,
        text: "VapeFlow has the best selection and prices. I've been a customer for over a year and they never disappoint. Highly recommend!",
        image: null
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Verified Customer",
        rating: 5,
        text: "The quality of products is unmatched. I love that everything is authentic with full warranties. The support team is also super helpful!",
        image: null
    },
    {
        id: 4,
        name: "David Thompson",
        role: "Verified Customer",
        rating: 5,
        text: "Switched from smoking to vaping thanks to VapeFlow. The staff helped me choose the perfect device. Life-changing experience!",
        image: null
    },
    {
        id: 5,
        name: "Lisa Martinez",
        role: "Verified Customer",
        rating: 5,
        text: "Amazing experience from start to finish. The website is easy to navigate, checkout was smooth, and my order arrived in perfect condition.",
        image: null
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToPrevious = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const goToSlide = (index) => {
        setIsAutoPlaying(false);
        setCurrentIndex(index);
    };

    return (
        <section className={styles.testimonials}>
            <div className="container">
                <h2 className={styles.title}>What Our Customers Say</h2>
                <p className={styles.subtitle}>Join thousands of satisfied vapers worldwide</p>

                <div className={styles.carouselWrapper}>
                    <button onClick={goToPrevious} className={`${styles.arrow} ${styles.prev}`} aria-label="Previous testimonial">
                        <ChevronLeft size={24} />
                    </button>

                    <div className={styles.carousel}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`${styles.card} ${index === currentIndex ? styles.active : ''}`}
                            >
                                <div className={styles.stars}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} fill="var(--color-secondary)" color="var(--color-secondary)" />
                                    ))}
                                </div>
                                <p className={styles.text}>"{testimonial.text}"</p>
                                <div className={styles.author}>
                                    <div className={styles.avatar}>
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className={styles.name}>{testimonial.name}</p>
                                        <p className={styles.role}>{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={goToNext} className={`${styles.arrow} ${styles.next}`} aria-label="Next testimonial">
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
