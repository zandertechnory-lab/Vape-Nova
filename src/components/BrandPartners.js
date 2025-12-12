"use client";

import styles from './BrandPartners.module.css';

const brands = [
    { name: "Storz & Bickel", logo: "S&B" },
    { name: "PAX", logo: "PAX" },
    { name: "DynaVap", logo: "DV" },
    { name: "Arizer", logo: "ARZ" },
    { name: "Firefly", logo: "FF" },
    { name: "Davinci", logo: "DVC" },
    { name: "Healthy Rips", logo: "HR" },
    { name: "Planet of the Vapes", logo: "POTV" }
];

export default function BrandPartners() {
    return (
        <section className={styles.brands}>
            <div className="container">
                <h3 className={styles.title}>Trusted by Industry Leaders</h3>
                <p className={styles.subtitle}>Authorized retailer of premium vaporizer brands</p>
                <div className={styles.grid}>
                    {brands.map((brand, index) => (
                        <div key={index} className={styles.brandCard}>
                            <div className={styles.logo}>{brand.logo}</div>
                            <p className={styles.name}>{brand.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
