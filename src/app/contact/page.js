"use client";

import styles from './page.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! We will get back to you shortly.');
    };

    return (
        <div className={`container ${styles.page}`}>
            <section className={styles.header}>
                <h1 className={styles.title}>Get in <span className="text-primary">Touch</span></h1>
                <p className={styles.subtitle}>
                    Have a question about a product or your order? We're here to help.
                </p>
            </section>

            <div className={styles.grid}>
                <div className={styles.info}>
                    <div className={styles.infoCard}>
                        <div className={styles.iconWrapper}>
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3>Email Us</h3>
                            <p>support@vapenova.com</p>
                            <p>admin@vapenova.com</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.iconWrapper}>
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3>Call Us</h3>
                            <p>+1 (555) 123-4567</p>
                            <p>Mon-Fri, 9am - 6pm EST</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.iconWrapper}>
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3>Visit Us</h3>
                            <p>123 Vapor Ave, Suite 420</p>
                            <p>Cloud City, CA 90210</p>
                        </div>
                    </div>
                </div>

                <div className={styles.formWrapper}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.row}>
                            <Input label="First Name" placeholder="John" required />
                            <Input label="Last Name" placeholder="Doe" required />
                        </div>
                        <Input label="Email" type="email" placeholder="john@example.com" required />
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Message</label>
                            <textarea
                                className={styles.textarea}
                                placeholder="How can we help you?"
                                rows={5}
                                required
                            ></textarea>
                        </div>
                        <Button variant="primary" size="lg" type="submit">Send Message</Button>
                    </form>
                </div>
            </div>

            <div className={styles.banner}>
                <div className={styles.bannerContent}>
                    <h2>Explore Our E-Liquid Collection</h2>
                    <p>Premium flavors from top brands, carefully curated for the ultimate vaping experience.</p>
                </div>
                <div className={styles.bannerImage}>
                    <img
                        src="/images/eliquid-showcase.jpg"
                        alt="Premium E-Liquid Collection"
                        className={styles.eliquidImage}
                    />
                </div>
            </div>
        </div>
    );
}
