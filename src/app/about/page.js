"use client";

import styles from './page.module.css';
import Button from '@/components/Button';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className={`container ${styles.page}`}>
            <section className={styles.hero}>
                <h1 className={styles.title}>Our <span className="text-primary">Story</span></h1>
                <p className={styles.subtitle}>
                    Redefining the vaping experience through innovation, quality, and design.
                </p>
            </section>

            <section className={styles.content}>
                <div className={styles.grid}>
                    <div className={styles.textBlock}>
                        <h2>Who We Are</h2>
                        <p>
                            Founded in 2023, VapeNova emerged from a simple desire: to elevate the standard of portable and desktop vaporization. We believe that technology should enhance your rituals, not complicate them. That's why we curate only the finest devices that marry form with function.
                        </p>
                        <p>
                            We are a team of engineers, designers, and enthusiasts who are passionate about purity and performance. Every product in our catalog is rigorously tested to ensure it meets our high standards for vapor quality, battery life, and durability.
                        </p>
                    </div>
                    <div className={styles.imageBlock}>
                        <img
                            src="/images/about-hero.jpg"
                            alt="VapeNova Experience"
                            className={styles.aboutImage}
                        />
                    </div>
                </div>

                <div className={styles.values}>
                    <div className={styles.valueCard}>
                        <h3>Quality First</h3>
                        <p>We never compromise on materials or build quality. Only medical-grade components make the cut.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <h3>Innovation</h3>
                        <p>We stay ahead of the curve, bringing you the latest heating technologies and smart features.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <h3>Community</h3>
                        <p>We're more than a shop; we're a community of connoisseurs dedicated to the craft.</p>
                    </div>
                </div>

                <div className={styles.showcase}>
                    <div className={styles.showcaseImage}>
                        <img
                            src="/images/product-showcase-1.png"
                            alt="Premium Geek Bar Device"
                            className={styles.productShowcase}
                        />
                    </div>
                    <div className={styles.showcaseText}>
                        <h2>Innovation Meets Design</h2>
                        <p>
                            Experience the perfect blend of cutting-edge technology and sleek aesthetics. Our devices feature advanced displays, precision controls, and stunning visual effects that elevate every session.
                        </p>
                        <p>
                            From intuitive interfaces to premium build quality, every detail is crafted to deliver an unparalleled vaping experience.
                        </p>
                    </div>
                </div>

                <div className={styles.cta}>
                    <h2>Ready to upgrade your session?</h2>
                    <Link href="/shop">
                        <Button variant="primary" size="lg">Explore Our Collection</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
