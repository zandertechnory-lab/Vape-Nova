"use client";

import { Shield, CreditCard, Truck, Award, Lock, RefreshCw } from 'lucide-react';
import styles from './TrustBadges.module.css';

const badges = [
    {
        icon: Shield,
        title: "100% Authentic",
        description: "Authorized retailer guarantee"
    },
    {
        icon: Lock,
        title: "Secure Checkout",
        description: "SSL encrypted payments"
    },
    {
        icon: Truck,
        title: "Free Shipping",
        description: "On orders over $200"
    },
    {
        icon: Award,
        title: "2-Year Warranty",
        description: "Full manufacturer coverage"
    },
    {
        icon: CreditCard,
        title: "Safe Payments",
        description: "Multiple payment options"
    },
    {
        icon: RefreshCw,
        title: "Easy Returns",
        description: "30-day return policy"
    }
];

export default function TrustBadges() {
    return (
        <section className={styles.badges}>
            <div className="container">
                <div className={styles.grid}>
                    {badges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <div key={index} className={styles.badge}>
                                <Icon size={32} className={styles.icon} />
                                <div>
                                    <h4 className={styles.title}>{badge.title}</h4>
                                    <p className={styles.description}>{badge.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
