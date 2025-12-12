"use client";

import { useState } from 'react';
import styles from './ProductTabs.module.css';

export default function ProductTabs({ specs, reviews, faqs }) {
    const [activeTab, setActiveTab] = useState('specs');

    return (
        <div className={styles.tabs}>
            <div className={styles.header}>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'specs' ? styles.active : ''}`}
                    onClick={() => setActiveTab('specs')}
                >
                    Specifications
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.active : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'faqs' ? styles.active : ''}`}
                    onClick={() => setActiveTab('faqs')}
                >
                    FAQs
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'specs' && (
                    <div className={styles.panel}>
                        <ul className={styles.specList}>
                            {specs.map((spec, i) => (
                                <li key={i} className={styles.specItem}>
                                    <span className={styles.specLabel}>{spec.label}</span>
                                    <span className={styles.specValue}>{spec.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className={styles.panel}>
                        {reviews.length > 0 ? (
                            reviews.map((review, i) => (
                                <div key={i} className={styles.review}>
                                    <div className={styles.reviewHeader}>
                                        <span className={styles.reviewer}>{review.user}</span>
                                        <span className={styles.rating}>{'★'.repeat(review.rating)}</span>
                                    </div>
                                    <p className={styles.reviewText}>{review.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No reviews yet.</p>
                        )}
                    </div>
                )}

                {activeTab === 'faqs' && (
                    <div className={styles.panel}>
                        {faqs.map((faq, i) => (
                            <div key={i} className={styles.faq}>
                                <h4 className={styles.question}>{faq.question}</h4>
                                <p className={styles.answer}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
