"use client";

import styles from './page.module.css';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FAQ_DATA = [
    {
        category: "General",
        questions: [
            {
                q: "What is a vaporizer?",
                a: "A vaporizer is a device that heats dry herbs or concentrates to a temperature that releases active compounds without combustion, providing a cleaner experience."
            },
            {
                q: "Are your products authentic?",
                a: "Yes! We only sell 100% authentic products directly from authorized manufacturers. Every product comes with a manufacturer's warranty."
            },
            {
                q: "Do you ship internationally?",
                a: "Currently, we ship within the United States only. International shipping may be available in the future."
            }
        ]
    },
    {
        category: "Orders & Shipping",
        questions: [
            {
                q: "How long does shipping take?",
                a: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout."
            },
            {
                q: "Do you offer free shipping?",
                a: "Yes! We offer free standard shipping on all orders over $200."
            },
            {
                q: "Can I track my order?",
                a: "Absolutely! Once your order ships, you'll receive a tracking number via email."
            }
        ]
    },
    {
        category: "Products",
        questions: [
            {
                q: "What's the difference between portable and desktop vaporizers?",
                a: "Portable vaporizers are compact and battery-powered for on-the-go use. Desktop vaporizers are larger, plug into a wall outlet, and typically offer more power and features."
            },
            {
                q: "How do I clean my vaporizer?",
                a: "Most vaporizers can be cleaned with isopropyl alcohol and cotton swabs. Always refer to your device's manual for specific cleaning instructions."
            },
            {
                q: "What warranty do products come with?",
                a: "Most of our products come with a 2-year manufacturer's warranty. Specific warranty details are listed on each product page."
            }
        ]
    },
    {
        category: "Returns & Support",
        questions: [
            {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy on unused products in original packaging. See our Returns page for full details."
            },
            {
                q: "How do I contact customer support?",
                a: "You can reach us via email at vapeflowservice@gmail.com or through our Contact page. We respond within 24 hours."
            },
            {
                q: "Do you offer technical support?",
                a: "Yes! Our expert team can help with setup, troubleshooting, and maintenance questions."
            }
        ]
    }
];

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.faqItem}>
            <button
                className={styles.faqQuestion}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                />
            </button>
            <div className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerOpen : ''}`}>
                <p>{answer}</p>
            </div>
        </div>
    );
}

export default function FAQPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Frequently Asked <span className="text-primary">Questions</span></h1>
                <p className={styles.subtitle}>
                    Find answers to common questions about our products, shipping, and policies.
                </p>
            </div>

            <div className={styles.content}>
                {FAQ_DATA.map((section, idx) => (
                    <div key={idx} className={styles.section}>
                        <h2 className={styles.categoryTitle}>{section.category}</h2>
                        <div className={styles.faqList}>
                            {section.questions.map((item, qIdx) => (
                                <FAQItem key={qIdx} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.cta}>
                <h3>Still have questions?</h3>
                <p>Our support team is here to help!</p>
                <a href="/contact" className={styles.ctaLink}>Contact Us</a>
            </div>
        </div>
    );
}
