"use client";

import styles from './page.module.css';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
    {
        id: 1,
        title: "The Ultimate Guide to Choosing Your First Vaporizer",
        excerpt: "New to vaping? Learn everything you need to know about selecting the perfect device for your needs, from portable to desktop models.",
        author: "Sarah Johnson",
        date: "Nov 15, 2024",
        category: "Guides",
        image: null
    },
    {
        id: 2,
        title: "Top 5 Vaporizers of 2024: Expert Reviews",
        excerpt: "Our team has tested dozens of devices. Here are the top performers that stood out in terms of quality, performance, and value.",
        author: "Mike Chen",
        date: "Nov 10, 2024",
        category: "Reviews",
        image: null
    },
    {
        id: 3,
        title: "How to Clean and Maintain Your Vaporizer",
        excerpt: "Proper maintenance extends the life of your device and ensures optimal performance. Follow these simple steps for best results.",
        author: "Emma Davis",
        date: "Nov 5, 2024",
        category: "Maintenance",
        image: null
    },
    {
        id: 4,
        title: "Understanding Temperature Settings: A Complete Guide",
        excerpt: "Different temperatures produce different effects. Learn how to dial in the perfect temperature for your preferences.",
        author: "James Wilson",
        date: "Oct 28, 2024",
        category: "Education",
        image: null
    },
    {
        id: 5,
        title: "Portable vs Desktop: Which is Right for You?",
        excerpt: "Can't decide between a portable or desktop vaporizer? We break down the pros and cons of each to help you choose.",
        author: "Sarah Johnson",
        date: "Oct 20, 2024",
        category: "Guides",
        image: null
    },
    {
        id: 6,
        title: "The Science Behind Vaporization",
        excerpt: "Understand the technology and science that makes vaporizers work, and why they're different from traditional methods.",
        author: "Dr. Alex Martinez",
        date: "Oct 15, 2024",
        category: "Education",
        image: null
    }
];

export default function BlogPage() {
    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>VapeFlow <span className="text-primary">Blog</span></h1>
                <p className={styles.subtitle}>
                    Expert guides, reviews, and tips to enhance your vaping experience
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.featured}>
                    <div className={styles.featuredImage}>
                        <div className={styles.imagePlaceholder}>Featured Article</div>
                    </div>
                    <div className={styles.featuredContent}>
                        <span className={styles.category}>{BLOG_POSTS[0].category}</span>
                        <h2>{BLOG_POSTS[0].title}</h2>
                        <p>{BLOG_POSTS[0].excerpt}</p>
                        <div className={styles.meta}>
                            <span><User size={16} /> {BLOG_POSTS[0].author}</span>
                            <span><Calendar size={16} /> {BLOG_POSTS[0].date}</span>
                        </div>
                        <Link href={`/blog/${BLOG_POSTS[0].id}`} className={styles.readMore}>
                            Read More <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                <div className={styles.grid}>
                    {BLOG_POSTS.slice(1).map((post) => (
                        <article key={post.id} className={styles.card}>
                            <div className={styles.cardImage}>
                                <div className={styles.imagePlaceholder}>Article Image</div>
                                <span className={styles.cardCategory}>{post.category}</span>
                            </div>
                            <div className={styles.cardContent}>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <div className={styles.cardMeta}>
                                    <span><User size={14} /> {post.author}</span>
                                    <span><Calendar size={14} /> {post.date}</span>
                                </div>
                                <Link href={`/blog/${post.id}`} className={styles.cardLink}>
                                    Read Article <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
