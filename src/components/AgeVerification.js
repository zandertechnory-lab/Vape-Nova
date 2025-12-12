"use client";

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './AgeVerification.module.css';
import Button from './Button';

export default function AgeVerification() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDenied, setIsDenied] = useState(false);

    useEffect(() => {
        const verified = localStorage.getItem('isAgeVerified');
        if (!verified) {
            setIsVisible(true);
            // Prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleVerify = () => {
        localStorage.setItem('isAgeVerified', 'true');

        // Animate out
        gsap.to(`.${styles.overlay}`, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                setIsVisible(false);
                document.body.style.overflow = 'auto';
            }
        });
    };

    const handleDeny = () => {
        setIsDenied(true);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {!isDenied ? (
                    <>
                        <h2 className={styles.title}>Age Verification</h2>
                        <p className={styles.text}>
                            You must be of legal smoking age in your jurisdiction to enter this site.
                        </p>
                        <div className={styles.actions}>
                            <Button variant="outline" onClick={handleDeny}>
                                I am under 21
                            </Button>
                            <Button variant="primary" onClick={handleVerify}>
                                I am 21+
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className={styles.denied}>
                        <h2 className={styles.title}>Access Denied</h2>
                        <p className={styles.text}>
                            You must be of legal age to view this content.
                        </p>
                        <Button
                            variant="ghost"
                            onClick={() => window.location.href = 'https://google.com'}
                        >
                            Leave Site
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
