"use client";
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import HeroSlider from '@/components/HeroSlider';
import Testimonials from '@/components/Testimonials';
import BrandPartners from '@/components/BrandPartners';
import Newsletter from '@/components/Newsletter';
import TrustBadges from '@/components/TrustBadges';
import FAQ from '@/components/FAQ';

import { ArrowRight, Zap, Shield, Truck, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient({ featuredProducts, content }) {
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const productsRef = useRef(null);

    useEffect(() => {
        // Hero animations
        const ctx = gsap.context(() => {
            // Features animation
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: 'top 80%',
                    once: true,
                },
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out'
            });

            // Products animation
            gsap.from('.product-card-animate', {
                scrollTrigger: {
                    trigger: productsRef.current,
                    start: 'top 80%',
                    once: true,
                },
                opacity: 0,
                scale: 0.8,
                stagger: 0.1,
                duration: 0.6,
                ease: 'back.out(1.7)'
            });

            // Stats animation
            gsap.from('.stat-item', {
                scrollTrigger: {
                    trigger: '.stats-section',
                    start: 'top 80%',
                    once: true,
                },
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out'
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.page} ref={heroRef}>
            {/* Hero Section */}
            {/* Hero Section */}
            {/* Hero Section */}
            <HeroSlider />

            {/* Stats Section */}
            <section className={`${styles.stats} stats-section`}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        <div className={`${styles.statItem} stat-item`}>
                            <h3>10K+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className={`${styles.statItem} stat-item`}>
                            <h3>50+</h3>
                            <p>Premium Products</p>
                        </div>
                        <div className={`${styles.statItem} stat-item`}>
                            <h3>24/7</h3>
                            <p>Customer Support</p>
                        </div>
                        <div className={`${styles.statItem} stat-item`}>
                            <h3>2 Year</h3>
                            <p>Warranty</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className={styles.products} ref={productsRef}>
                <div className="container">
                    <div className={styles.productsHeader}>
                        <h2 className={styles.sectionTitle}>Featured Products</h2>
                        <Link href="/shop">
                            <Button variant="outline">View All <ArrowRight size={18} /></Button>
                        </Link>
                    </div>
                    <div className={styles.productsGrid}>
                        {featuredProducts.map((product, index) => (
                            <div key={product.id} className="product-card-animate">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    {featuredProducts.length === 0 && (
                        <p className={styles.noProducts}>No products available. Add products from the admin panel!</p>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features} ref={featuresRef}>
                <div className="container">
                    <div className={styles.featuresContent}>
                        <div className={styles.featuresText}>
                            <h2 className={styles.sectionTitle}>Why Choose VapeNova</h2>
                            <p className={styles.sectionDesc}>
                                We are dedicated to providing the best vaping experience with premium products and unmatched service.
                            </p>
                            <div className={styles.featuresGrid}>
                                <div className={`${styles.featureCard} feature-card`}>
                                    <div className={styles.featureIcon}>
                                        <Shield size={32} />
                                    </div>
                                    <div>
                                        <h3>Premium Quality</h3>
                                        <p>100% authentic devices with full warranties.</p>
                                    </div>
                                </div>
                                <div className={`${styles.featureCard} feature-card`}>
                                    <div className={styles.featureIcon}>
                                        <Truck size={32} />
                                    </div>
                                    <div>
                                        <h3>Fast Shipping</h3>
                                        <p>Free delivery on orders over $200.</p>
                                    </div>
                                </div>
                                <div className={`${styles.featureCard} feature-card`}>
                                    <div className={styles.featureIcon}>
                                        <Star size={32} />
                                    </div>
                                    <div>
                                        <h3>Expert Support</h3>
                                        <p>Personalized recommendations and help.</p>
                                    </div>
                                </div>
                                <div className={`${styles.featureCard} feature-card`}>
                                    <div className={styles.featureIcon}>
                                        <Zap size={32} />
                                    </div>
                                    <div>
                                        <h3>Latest Tech</h3>
                                        <p>The most advanced devices available.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.featuresImageWrapper}>
                            <img
                                src="/images/product-showcase-2.jpg"
                                alt="Premium Vaping Experience"
                                className={styles.featuresImage}
                            />
                            <div className={styles.imageOverlay}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Partners */}
            <BrandPartners />

            {/* Trust Badges */}
            <TrustBadges />

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <FAQ />

            {/* Newsletter */}
            <Newsletter />

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Ready to Elevate Your Experience?</h2>
                        <p>Join thousands of satisfied customers and discover the VapeNova difference.</p>
                        <Link href="/shop">
                            <Button variant="primary" size="lg">
                                Start Shopping <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
