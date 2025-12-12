"use client";

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin, CreditCard, Shield, Truck, Award } from 'lucide-react';
import styles from './Footer.module.css';
import Input from './Input';
import Button from './Button';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            VapeNova
                        </Link>
                        <p className={styles.desc}>
                            Premium vaporizers and accessories for the discerning enthusiast.
                            Elevate your experience with our curated collection.
                        </p>
                        <div className={styles.contact}>
                            <div className={styles.contactItem}>
                                <Mail size={16} />
                                <span>support@vapenova.com</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Phone size={16} />
                                <span>1-800-VAPENOVA</span>
                            </div>
                            <div className={styles.contactItem}>
                                <MapPin size={16} />
                                <span>123 Vapor Street, Cloud City</span>
                            </div>
                        </div>
                        <div className={styles.socials}>
                            <Link href="#" className={styles.socialLink}><Instagram size={20} /></Link>
                            <Link href="#" className={styles.socialLink}><Twitter size={20} /></Link>
                            <Link href="#" className={styles.socialLink}><Facebook size={20} /></Link>
                            <Link href="#" className={styles.socialLink}><Youtube size={20} /></Link>
                            <Link href="#" className={styles.socialLink}><Linkedin size={20} /></Link>
                        </div>
                    </div>

                    <div className={styles.links}>
                        <h3 className={styles.heading}>Shop</h3>
                        <Link href="/shop?category=vapes" className={styles.link}>Vapes</Link>
                        <Link href="/shop?category=portable" className={styles.link}>Portable</Link>
                        <Link href="/shop?category=desktop" className={styles.link}>Desktop</Link>
                        <Link href="/shop?category=concentrates" className={styles.link}>Concentrates</Link>
                        <Link href="/shop?category=accessories" className={styles.link}>Accessories</Link>
                        <Link href="/shop" className={styles.link}>All Products</Link>
                    </div>

                    <div className={styles.links}>
                        <h3 className={styles.heading}>Company</h3>
                        <Link href="/about" className={styles.link}>About Us</Link>
                        <Link href="/blog" className={styles.link}>Blog</Link>
                        <Link href="/contact" className={styles.link}>Contact</Link>
                        <Link href="/careers" className={styles.link}>Careers</Link>
                        <Link href="/press" className={styles.link}>Press</Link>
                        <Link href="/reviews" className={styles.link}>Reviews</Link>
                        <Link href="/admin/login" className={styles.link}>Admin</Link>
                    </div>

                    <div className={styles.links}>
                        <h3 className={styles.heading}>Support</h3>
                        <Link href="/contact" className={styles.link}>Contact Us</Link>
                        <Link href="/shipping" className={styles.link}>Shipping Policy</Link>
                        <Link href="/returns" className={styles.link}>Returns & Refunds</Link>
                        <Link href="/faq" className={styles.link}>FAQs</Link>
                        <Link href="/warranty" className={styles.link}>Warranty</Link>
                        <Link href="/track-order" className={styles.link}>Track Order</Link>
                    </div>

                    <div className={styles.newsletter}>
                        <h3 className={styles.heading}>Stay Updated</h3>
                        <p className={styles.text}>Subscribe for exclusive offers and new drops.</p>
                        <form className={styles.form}>
                            <Input placeholder="Enter your email" type="email" />
                            <Button variant="primary">Subscribe</Button>
                        </form>
                        <div className={styles.trustBadges}>
                            <div className={styles.badge}>
                                <Shield size={24} />
                                <span>Secure Checkout</span>
                            </div>
                            <div className={styles.badge}>
                                <Truck size={24} />
                                <span>Free Shipping</span>
                            </div>
                            <div className={styles.badge}>
                                <Award size={24} />
                                <span>Quality Guaranteed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.payment}>
                    <div className={styles.paymentTitle}>
                        <CreditCard size={20} />
                        <span>We Accept</span>
                    </div>
                    <div className={styles.paymentMethods}>
                        <div className={styles.paymentMethod}>Revolut</div>
                        <div className={styles.paymentMethod}>PayPal</div>
                        <div className={styles.paymentMethod}>PayID</div>
                        <div className={styles.paymentMethod}>Bank Transfer</div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.bottomLinks}>
                        <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
                        <span className={styles.separator}>•</span>
                        <Link href="/terms" className={styles.bottomLink}>Terms of Service</Link>
                        <span className={styles.separator}>•</span>
                        <Link href="/cookies" className={styles.bottomLink}>Cookie Policy</Link>
                        <span className={styles.separator}>•</span>
                        <Link href="/accessibility" className={styles.bottomLink}>Accessibility</Link>
                    </div>
                    <p>&copy; {new Date().getFullYear()} VapeNova. All rights reserved.</p>
                    <p className={styles.warning}>
                        WARNING: Products contain nicotine. Nicotine is an addictive chemical.
                    </p>
                    <p className={styles.ageWarning}>
                        This product is intended for adult users of nicotine-containing products, particularly current smokers or vapers.
                        Underage sale is prohibited. By entering this site, you certify that you are of legal smoking age.
                    </p>
                </div>
            </div>
        </footer>
    );
}
