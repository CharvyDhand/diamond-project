'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import styles from './OrderConfirmation.module.css';
import { useEffect, useState } from 'react';

export default function OrderConfirmation() {
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // Generate random order ID
        setOrderId('ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, []);

    return (
        <div className={styles.confirmationContainer}>
            <CheckCircle className={styles.icon} />
            <h1 className={styles.title}>Order Confirmed!</h1>
            <p className={styles.message}>
                Thank you for your purchase. Your order has been received and is being processed.
                You will receive an email confirmation shortly.
            </p>

            <div className={styles.detailsBox}>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Order Number:</span>
                    <span>{orderId}</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Estimated Delivery:</span>
                    <span>3-5 Business Days</span>
                </div>
                <div className={styles.detailRow}>
                    <span className={styles.label}>Payment Method:</span>
                    <span>PayPal</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link href="/" className="btn">Continue Shopping</Link>
                <Link href="/track-order" className="btn btn-secondary">Track Order</Link>
            </div>
        </div>
    );
}
