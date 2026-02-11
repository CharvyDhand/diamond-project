'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useAuth();

    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Mobile Menu Button - Visible only on mobile via CSS */}
                <button
                    className={`${styles.iconBtn} ${styles.mobileMenuBtn}`}
                    aria-label="Toggle Menu"
                    onClick={toggleMenu}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <Link href="/" className={styles.logo} onClick={handleScrollToTop}>
                    Gems Boutique
                </Link>

                <div className={styles.actions}>
                    {user ? (
                        <Link href="/account" className={styles.iconBtn} aria-label="Account">
                            <User size={22} />
                        </Link>
                    ) : (
                        <Link href="/login" className={styles.iconBtn} aria-label="Login" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                            Login
                        </Link>
                    )}
                    <Link href="/cart" className={styles.iconBtn} aria-label="Cart">
                        <ShoppingBag size={22} />
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/" className={styles.link} onClick={handleScrollToTop}>Home</Link>
                    <Link href="/shop" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                </div>
            )}
        </nav>
    );
}
