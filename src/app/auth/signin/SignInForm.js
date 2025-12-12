"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/context/AuthContext';

export default function SignInForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { signIn } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const result = signIn(formData.email, formData.password);

        if (result.success) {
            router.push(redirect);
        } else {
            setError(result.error);
        }
    };

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome <span className="text-primary">Back</span></h1>
                    <p className={styles.subtitle}>Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        required
                    />

                    {error && <div className={styles.error}>{error}</div>}

                    <Button variant="primary" size="lg" type="submit">
                        Sign In
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>Don't have an account? <Link href={`/auth/signup${redirect !== '/' ? `?redirect=${redirect}` : ''}`} className={styles.link}>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}
