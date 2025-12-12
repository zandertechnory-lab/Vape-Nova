"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
    {
        question: "Are all your products authentic?",
        answer: "Yes, 100%! We are an authorized retailer and all our products come directly from manufacturers with full warranties. We guarantee authenticity on every device."
    },
    {
        question: "What is your shipping policy?",
        answer: "We offer free shipping on all orders over $200. Standard shipping takes 3-5 business days. Express shipping is available for an additional fee and arrives in 1-2 business days."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Currently, we ship within the United States only. We're working on expanding to international markets soon. Sign up for our newsletter to be notified when we start shipping to your country."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy on all products. Items must be unused and in original packaging. Please contact our support team to initiate a return."
    },
    {
        question: "How long is the warranty?",
        answer: "All vaporizers come with a full 2-year manufacturer warranty. Some premium models include extended warranties. Warranty details are listed on each product page."
    },
    {
        question: "Do you offer customer support?",
        answer: "Absolutely! Our expert support team is available 24/7 via email and live chat. We're passionate about vaping and happy to help with product recommendations, troubleshooting, and any questions you may have."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faq}>
            <div className="container">
                <h2 className={styles.title}>Frequently Asked Questions</h2>
                <p className={styles.subtitle}>Everything you need to know about VapeFlow</p>

                <div className={styles.accordion}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={styles.item}>
                            <button
                                className={styles.question}
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    size={20}
                                    className={`${styles.icon} ${openIndex === index ? styles.rotated : ''}`}
                                />
                            </button>
                            <div className={`${styles.answer} ${openIndex === index ? styles.open : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
