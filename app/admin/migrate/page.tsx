'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { addProduct } from '@/lib/db';
import styles from '../Admin.module.css';

export default function MigratePage() {
    const [status, setStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
    const [progress, setProgress] = useState(0);

    const handleMigration = async () => {
        if (!confirm(`Are you sure you want to migrate ${products.length} products to Firestore?`)) return;

        setStatus('migrating');
        let count = 0;

        try {
            for (const product of products) {
                // Remove ID from static data to let Firestore generate fresh IDs
                const { id, ...productData } = product;
                await addProduct({
                    ...productData,
                    stock: 10, // Default stock
                    description: `${product.name} - Exquisite diamond jewelry piece.`
                });
                count++;
                setProgress(Math.round((count / products.length) * 100));
            }
            setStatus('success');
        } catch (error) {
            console.error('Migration error:', error);
            setStatus('error');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1 className={styles.pageTitle}>Data Migration</h1>
            <div className={styles.card}>
                <p style={{ marginBottom: '1.5rem' }}>
                    This tool will take all products from the static `data/products.ts` file and upload them to your Firestore database.
                </p>

                {status === 'idle' && (
                    <button onClick={handleMigration} className={styles.payBtn}>
                        Start Migration ({products.length} products)
                    </button>
                )}

                {status === 'migrating' && (
                    <div>
                        <div style={{ background: '#e2e8f0', height: '20px', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
                            <div style={{ background: '#667eea', height: '100%', width: `${progress}%`, transition: 'width 0.3s' }}></div>
                        </div>
                        <p>Migrating... {progress}% completed</p>
                    </div>
                )}

                {status === 'success' && (
                    <div style={{ color: '#059669', fontWeight: 600 }}>
                        ✅ Migration successful! All products are now in Firestore.
                    </div>
                )}

                {status === 'error' && (
                    <div style={{ color: '#dc2626', fontWeight: 600 }}>
                        ❌ Migration failed. Check console for errors.
                    </div>
                )}
            </div>
        </div>
    );
}
