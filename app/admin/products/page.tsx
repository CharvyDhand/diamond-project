'use client';

import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, deleteProduct, updateProduct } from '@/lib/db';
import type { Product } from '@/lib/db';
import styles from '../Admin.module.css';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: '',
        price: 0,
        category: 'Diamonds',
        image: '',
        description: '',
        stock: 10
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await addProduct(formData);
            setFormData({
                name: '',
                price: 0,
                category: 'Diamonds',
                image: '',
                description: '',
                stock: 10
            });
            setIsAdding(false);
            loadProducts();
            alert('Product added successfully!');
        } catch (err: any) {
            setError(err.message || 'Failed to add product');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (err: any) {
            alert('Error deleting product: ' + err.message);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading products...</div>;

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Gem Management</h1>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={styles.payBtn}
                    style={{ width: 'auto', padding: '0.6rem 1.2rem' }}
                >
                    {isAdding ? 'Cancel' : '+ Add New Gem'}
                </button>
            </div>

            {error && (
                <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    {error}
                </div>
            )}

            {isAdding && (
                <div className={styles.card} style={{ marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Gemstone Product</h2>
                    <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Gem Name</label>
                            <input
                                required name="name" className={styles.input}
                                value={formData.name} onChange={handleInputChange}
                                placeholder="e.g. Rare Blue Sapphire"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Gem Category</label>
                            <select
                                name="category" className={styles.input}
                                value={formData.category} onChange={handleInputChange}
                                style={{ padding: '0.75rem' }}
                            >
                                <option value="Diamonds">Diamonds</option>
                                <option value="Rubies">Rubies</option>
                                <option value="Sapphires">Sapphires</option>
                                <option value="Emeralds">Emeralds</option>
                                <option value="Opals">Opals</option>
                                <option value="Pearls">Pearls</option>
                                <option value="Amethysts">Amethysts</option>
                                <option value="Topaz">Topaz</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Price ($)</label>
                            <input
                                required type="number" name="price" className={styles.input}
                                value={formData.price} onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Stock Quantity</label>
                            <input
                                required type="number" name="stock" className={styles.input}
                                value={formData.stock} onChange={handleInputChange}
                            />
                        </div>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Image URL (Unsplash or direct link)</label>
                            <input
                                required name="image" className={styles.input}
                                value={formData.image} onChange={handleInputChange}
                                placeholder="https://images.unsplash.com/..."
                            />
                        </div>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Description</label>
                            <textarea
                                name="description" className={styles.input}
                                value={formData.description} onChange={handleInputChange}
                                style={{ minHeight: '100px' }}
                            />
                        </div>
                        <button type="submit" className={styles.payBtn} style={{ gridColumn: 'span 2' }}>
                            Save Product
                        </button>
                    </form>
                </div>
            )}

            <div className={styles.card}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                            <th style={{ padding: '1rem' }}>Image</th>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Category</th>
                            <th style={{ padding: '1rem' }}>Price</th>
                            <th style={{ padding: '1rem' }}>Stock</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                                    No products found in Firestore.
                                </td>
                            </tr>
                        ) : (
                            products.map(product => (
                                <tr key={product.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{product.name}</td>
                                    <td style={{ padding: '1rem' }}>{product.category}</td>
                                    <td style={{ padding: '1rem' }}>${product.price.toLocaleString()}</td>
                                    <td style={{ padding: '1rem' }}>{product.stock}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id!)}
                                            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
