"use client";

import styles from './page.module.css';
import { Package, Truck, Clock, MapPin } from 'lucide-react';

export default function ShippingPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Shipping <span className="text-primary">Information</span></h1>
                <p className={styles.subtitle}>
                    Fast, reliable shipping to get your products to you quickly and safely.
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                        <div className={styles.iconWrapper}>
                            <Truck size={32} />
                        </div>
                        <h3>Free Shipping</h3>
                        <p>On all orders over $200</p>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.iconWrapper}>
                            <Clock size={32} />
                        </div>
                        <h3>Fast Delivery</h3>
                        <p>3-5 business days standard</p>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.iconWrapper}>
                            <Package size={32} />
                        </div>
                        <h3>Secure Packaging</h3>
                        <p>Discreet and protected</p>
                    </div>
                    <div className={styles.infoCard}>
                        <div className={styles.iconWrapper}>
                            <MapPin size={32} />
                        </div>
                        <h3>Track Your Order</h3>
                        <p>Real-time tracking updates</p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Shipping Methods</h2>
                    <div className={styles.methodsTable}>
                        <div className={styles.tableRow}>
                            <div className={styles.tableCell}>
                                <strong>Standard Shipping</strong>
                                <span className={styles.badge}>Free over $200</span>
                            </div>
                            <div className={styles.tableCell}>3-5 Business Days</div>
                            <div className={styles.tableCell}>$9.99</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableCell}>
                                <strong>Express Shipping</strong>
                            </div>
                            <div className={styles.tableCell}>1-2 Business Days</div>
                            <div className={styles.tableCell}>$24.99</div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.tableCell}>
                                <strong>Overnight Shipping</strong>
                            </div>
                            <div className={styles.tableCell}>Next Business Day</div>
                            <div className={styles.tableCell}>$39.99</div>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>Processing Time</h2>
                    <p>
                        Orders are typically processed within 1-2 business days. You'll receive a confirmation email
                        once your order has been placed, and a shipping confirmation with tracking information once
                        your order has shipped.
                    </p>
                    <p>
                        Please note that processing times may be longer during peak seasons or promotional periods.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2>Shipping Restrictions</h2>
                    <ul className={styles.list}>
                        <li>We currently ship within the United States only</li>
                        <li>PO Boxes and APO/FPO addresses are accepted</li>
                        <li>Some products may have shipping restrictions based on local laws</li>
                        <li>Age verification (21+) is required for all deliveries</li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h2>International Shipping</h2>
                    <p>
                        We are currently working on expanding our shipping to international destinations.
                        Please check back soon or contact our customer support team for updates.
                    </p>
                </div>

                <div className={styles.section}>
                    <h2>Order Tracking</h2>
                    <p>
                        Once your order ships, you'll receive an email with a tracking number. You can use this
                        number to track your package on the carrier's website. If you have any questions about
                        your shipment, please contact our customer support team.
                    </p>
                </div>
            </div>
        </div>
    );
}
