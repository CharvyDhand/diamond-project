import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from '../about/About.module.css';

export default function ShippingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>
                <h1 className={styles.title}>Shipping & Returns</h1>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>Shipping Policy</h2>
                    <p>
                        We offer complimentary insured shipping on all orders within Australia.
                        International shipping is available for a flat rate. All shipments are securely packaged
                        and require a signature upon delivery.
                    </p>
                    <ul>
                        <li><strong>Standard Shipping:</strong> 3-5 business days</li>
                        <li><strong>Express Shipping:</strong> 1-2 business days</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Return Policy</h2>
                    <p>
                        We want you to be completely delighted with your Caraté Luxe purchase.
                        If for any reason you are not satisfied, we accept returns within 30 days of delivery
                        for a full refund or exchange.
                    </p>
                    <p>
                        Items must be returned in their original condition, unworn, and with all original packaging
                        and documentation.
                    </p>
                </section>
            </div>
        </div>
    );
}
