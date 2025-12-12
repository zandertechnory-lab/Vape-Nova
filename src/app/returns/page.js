"use client";

import styles from './page.module.css';
import { RotateCcw, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ReturnsPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Returns & <span className="text-primary">Refunds</span></h1>
                <p className={styles.subtitle}>
                    We want you to be completely satisfied with your purchase. Learn about our hassle-free return policy.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.policyGrid}>
                    <div className={styles.policyCard}>
                        <div className={styles.iconWrapper}>
                            <Clock size={32} />
                        </div>
                        <h3>30-Day Returns</h3>
                        <p>Return unused items within 30 days of delivery</p>
                    </div>
                    <div className={styles.policyCard}>
                        <div className={styles.iconWrapper}>
                            <RotateCcw size={32} />
                        </div>
                        <h3>Easy Process</h3>
                        <p>Simple return process with prepaid labels</p>
                    </div>
                    <div className={styles.policyCard}>
                        <div className={styles.iconWrapper}>
                            <CheckCircle size={32} />
                        </div>
                        <h3>Full Refund</h3>
                        <p>Get your money back within 5-7 business days</p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Return Policy</h2>
                    <p>
                        We accept returns on most products within 30 days of delivery. To be eligible for a return,
                        items must be unused, in their original packaging, and in the same condition that you received them.
                    </p>
                    <p>
                        Please note that certain items are non-returnable for health and safety reasons, including
                        used vaporizers, opened consumables, and clearance items.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2>How to Return an Item</h2>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <div>
                                <h4>Contact Us</h4>
                                <p>Email vapeflowservice@gmail.com with your order number and reason for return</p>
                            </div>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <div>
                                <h4>Receive Authorization</h4>
                                <p>We'll send you a return authorization and prepaid shipping label</p>
                            </div>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <div>
                                <h4>Ship It Back</h4>
                                <p>Pack the item securely and ship it using the provided label</p>
                            </div>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>4</div>
                            <div>
                                <h4>Get Your Refund</h4>
                                <p>Receive your refund within 5-7 business days after we receive the item</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Refund Policy</h2>
                    <p>
                        Once we receive your return, we'll inspect the item and process your refund. Refunds will
                        be issued to the original payment method within 5-7 business days.
                    </p>
                    <p>
                        Please note that shipping costs are non-refundable unless the return is due to our error
                        (e.g., wrong item shipped, defective product).
                    </p>
                </div>

                <div className={styles.section}>
                    <h2>Exchanges</h2>
                    <p>
                        We currently don't offer direct exchanges. If you need a different product, please return
                        the original item for a refund and place a new order for the item you want.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2>Damaged or Defective Items</h2>
                    <p>
                        If you receive a damaged or defective item, please contact us immediately with photos of
                        the damage. We'll arrange for a replacement or full refund, including return shipping costs.
                    </p>
                </div>

                <div className={styles.eligibility}>
                    <h3>Non-Returnable Items</h3>
                    <ul className={styles.list}>
                        <li><XCircle size={18} /> Used or opened vaporizers</li>
                        <li><XCircle size={18} /> Clearance or final sale items</li>
                        <li><XCircle size={18} /> Gift cards</li>
                        <li><XCircle size={18} /> Items returned after 30 days</li>
                    </ul>
                </div>

                <div className={styles.cta}>
                    <h3>Need Help with a Return?</h3>
                    <p>Our customer support team is here to assist you</p>
                    <a href="/contact" className={styles.ctaLink}>Contact Support</a>
                </div>
            </div>
        </div>
    );
}
