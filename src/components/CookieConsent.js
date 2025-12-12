"use client";

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <Cookie size={24} className={styles.icon} />
                <div className={styles.text}>
                    <p className={styles.title}>We use cookies</p>
                    <p className={styles.description}>
                        We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                    </p>
                </div>
                <div className={styles.actions}>
                    <button onClick={acceptCookies} className={styles.accept}>
                        Accept
                    </button>
                    <button onClick={declineCookies} className={styles.decline}>
                        Decline
                    </button>
                </div>
                <button onClick={declineCookies} className={styles.close} aria-label="Close">
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}
