'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProduct } from '@/lib/db';
import type { Product } from '@/lib/db';
import { useCart } from '@/context/CartContext';
import styles from './ProductDetails.module.css';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        async function loadProduct() {
            if (params.id) {
                try {
                    const data = await getProduct(params.id as string);
                    setProduct(data);
                } catch (error) {
                    console.error('Error loading product:', error);
                } finally {
                    setLoading(false);
                }
            }
        }
        loadProduct();
    }, [params.id]);

    if (loading) {
        return (
            <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                <p>Loading gem details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Gem not found</h2>
                <Link href="/shop" style={{ textDecoration: 'underline', marginTop: '1rem', display: 'block' }}>
                    Back to Shop
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        alert('Added to cart!');
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={styles.productImage}
                        priority
                    />
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '1.2rem', color: '#94a3b8' }}>No Image Available</div>
                )}
            </div>

            <div className={styles.infoSection}>
                <div>
                    <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Back to Shop
                    </Link>
                    <span className={styles.category}>{product.category}</span>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>${product.price.toLocaleString()}</p>
                    <p className={styles.description}>{product.description}</p>

                    {product.specs && (
                        <div className={styles.specsContainer}>
                            {product.specs.carat && (
                                <div className={styles.specRow}>
                                    <span className={styles.specLabel}>Carat Weight</span>
                                    <span className={styles.specValue}>{product.specs.carat}</span>
                                </div>
                            )}
                            {product.specs.color && (
                                <div className={styles.specRow}>
                                    <span className={styles.specLabel}>Color</span>
                                    <span className={styles.specValue}>{product.specs.color}</span>
                                </div>
                            )}
                            {product.specs.clarity && (
                                <div className={styles.specRow}>
                                    <span className={styles.specLabel}>Clarity</span>
                                    <span className={styles.specValue}>{product.specs.clarity}</span>
                                </div>
                            )}
                            {product.specs.cut && (
                                <div className={styles.specRow}>
                                    <span className={styles.specLabel}>Cut</span>
                                    <span className={styles.specValue}>{product.specs.cut}</span>
                                </div>
                            )}
                            {product.specs.metal && (
                                <div className={styles.specRow}>
                                    <span className={styles.specLabel}>Metal</span>
                                    <span className={styles.specValue}>{product.specs.metal}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.actions}>
                    <button onClick={handleAddToCart} className={styles.addToCartBtn}>
                        Add into Cart
                    </button>
                    <button className={styles.contactBtn}>
                        Enquire
                    </button>
                </div>
            </div>
        </div>
    );
}
