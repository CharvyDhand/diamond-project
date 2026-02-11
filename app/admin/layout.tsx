'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { checkAdminStatus, adminLogout } from '@/lib/admin';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import styles from './Admin.module.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                if (pathname !== '/admin/login') {
                    router.push('/admin/login');
                }
                setLoading(false);
                return;
            }

            const isAdmin = await checkAdminStatus();

            if (!isAdmin) {
                await adminLogout();
                router.push('/admin/login');
                setLoading(false);
                return;
            }

            setIsAuthenticated(true);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [pathname, router]);

    const handleLogout = async () => {
        await adminLogout();
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ fontSize: '1.2rem', color: '#64748b' }}>Loading...</div>
            </div>
        );
    }

    // Show login page without layout
    if (pathname === '/admin/login') {
        return children;
    }

    // Show layout only for authenticated admins
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.adminLayout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarTitle}>💎 Gems Admin</div>

                <nav style={{ flex: 1 }}>
                    <Link href="/admin" className={styles.navItem}>
                        <LayoutDashboard size={20} style={{ display: 'inline', marginRight: '10px' }} /> Dashboard
                    </Link>
                    <Link href="/admin/orders" className={styles.navItem}>
                        <ShoppingCart size={20} style={{ display: 'inline', marginRight: '10px' }} /> Orders
                    </Link>
                    <Link href="/admin/products" className={styles.navItem}>
                        <Package size={20} style={{ display: 'inline', marginRight: '10px' }} /> Products
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className={styles.navItem}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                    <LogOut size={20} style={{ display: 'inline', marginRight: '10px' }} /> Logout
                </button>
            </aside>

            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
