import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.column}>
                    <h3>Caraté Luxe</h3>
                    <p className={styles.description}>
                        Crafting eternal moments with ethically sourced, certified diamonds. Experience the brilliance of perfection.
                    </p>
                    <div className={styles.companyInfo}>
                        <p>Abn: 62692370246</p>
                        <p>Wher Pty ltd</p>
                        <p>Address: 44 Burlington road homebush</p>
                        <p>Vengadasalam rasapathy</p>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3>Shop</h3>
                    <ul>
                        <li><Link href="/shop?category=rings">Engagement Rings</Link></li>
                        <li><Link href="/shop?category=necklaces">Necklaces</Link></li>
                        <li><Link href="/shop?category=earrings">Earrings</Link></li>
                        <li><Link href="/shop?category=bracelets">Bracelets</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>Customer Care</h3>
                    <ul>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/shipping">Shipping & Returns</Link></li>
                        <li><Link href="/faq">FAQs</Link></li>
                        <li><Link href="/track-order">Track Order</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>Legal</h3>
                    <ul>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Caraté Luxe. All rights reserved.</p>
                <div className={styles.socials}>
                    <Link href="#"><Instagram size={20} /></Link>
                    <Link href="#"><Facebook size={20} /></Link>
                    <Link href="#"><Twitter size={20} /></Link>
                </div>
            </div>
        </footer>
    );
}
