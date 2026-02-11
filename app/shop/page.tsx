'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products as staticProducts } from '@/data/products';
import { getProducts } from '@/lib/db';
import type { Product } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import styles from './Shop.module.css';

export default function Shop() {
    const searchParams = useSearchParams();
    const rangeParam = searchParams.get('range');

    const [selectedRanges, setSelectedRanges] = useState<string[]>(
        rangeParam ? [rangeParam] : []
    );
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const priceRanges = [
        { id: '10-500', label: '$10 - $500', min: 10, max: 500 },
        { id: '500-2000', label: '$500 - $2,000', min: 500, max: 2000 },
        { id: '2000-5000', label: '$2,000 - $5,000', min: 2000, max: 5000 },
        { id: '5000-10000', label: '$5,000 - $10,000', min: 5000, max: 10000 }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const firestoreProducts = await getProducts();
                if (firestoreProducts.length > 0) {
                    setProducts(firestoreProducts);
                } else {
                    // Fallback to static if Firestore is empty
                    setProducts(staticProducts);
                }
            } catch (error) {
                console.error('Firestore error, using static products:', error);
                setProducts(staticProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const toggleRange = (rangeId: string) => {
        setSelectedRanges(prev =>
            prev.includes(rangeId)
                ? prev.filter(r => r !== rangeId)
                : [...prev, rangeId]
        );
    };

    const filteredProducts = useMemo(() => {
        if (selectedRanges.length === 0) return products;

        return products.filter(product => {
            return selectedRanges.some(rangeId => {
                const range = priceRanges.find(r => r.id === rangeId);
                if (!range) return false;
                return product.price >= range.min && product.price <= range.max;
            });
        });
    }, [selectedRanges, products]);

    return (
        <div className={styles.shopContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.filterSection}>
                    <h3 className={styles.filterTitle}>Price Range</h3>
                    <ul className={styles.filterList}>
                        {priceRanges.map(range => (
                            <li key={range.id} className={styles.filterItem}>
                                <label className={styles.filterLabel}>
                                    <input
                                        type="checkbox"
                                        checked={selectedRanges.includes(range.id)}
                                        onChange={() => toggleRange(range.id)}
                                    />
                                    {range.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div className={styles.main}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Exquisite Gems</h1>
                    <p className={styles.resultCount}>
                        {loading ? 'Loading gems...' : `Showing ${filteredProducts.length} results`}
                    </p>
                </div>

                <div className={styles.productGrid}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id!} product={product} />
                    ))}
                    {!loading && filteredProducts.length === 0 && (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                            <p>No gems found in the selected price range.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
