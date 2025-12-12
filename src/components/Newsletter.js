"use client";

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setEmail('');
                setSubscribed(false);
            }, 3000);
        }
    };

    return (
        <section className={styles.newsletter}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.textSection}>
                        <h2 className={styles.title}>Stay in the Loop</h2>
                        <p className={styles.description}>
                            Join our community and get exclusive deals, vaping tips, and early access to new products.
                        </p>
                        <ul className={styles.benefits}>
                            <li><CheckCircle size={20} /> Exclusive discounts & promotions</li>
                            <li><CheckCircle size={20} /> Early access to new arrivals</li>
                            <li><CheckCircle size={20} /> Expert vaping tips & guides</li>
                        </ul>
                    </div>
                    <div className={styles.formSection}>
                        {subscribed ? (
                            <div className={styles.success}>
                                <CheckCircle size={48} />
                                <p>Thanks for subscribing!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.inputWrapper}>
                                    <Mail size={20} className={styles.icon} />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.input}
                                        required
                                        suppressHydrationWarning
                                    />
                                </div>
                                <button type="submit" className={styles.button}>
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
