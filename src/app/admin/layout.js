"use client";

import { usePathname } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import { AdminProvider } from '@/context/AdminContext';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    return (
        <AdminProvider>
            <div style={{ display: 'flex' }}>
                {!isLoginPage && <AdminNav />}
                <main style={{
                    flex: 1,
                    marginLeft: isLoginPage ? '0' : '250px',
                    minHeight: '100vh',
                    backgroundColor: 'var(--color-bg)'
                }}>
                    {children}
                </main>
            </div>
        </AdminProvider>
    );
}
