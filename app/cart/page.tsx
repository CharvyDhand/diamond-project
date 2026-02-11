'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './Cart.module.css';
import { Trash2, Minus, Plus } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className={styles.cartContainer} style={{ textAlign: 'center', padding: '6rem 1rem' }}>
                <h1 className={styles.title}>Your Cart is Empty</h1>
                <p style={{ marginBottom: '2rem', color: '#64748b' }}>Looks like you haven't found your perfect diamond yet.</p>
                <Link href="/shop" className="btn">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className={styles.cartContainer}>
            <h1 className={styles.title}>Shopping Cart</h1>

            <div className={styles.content}>
                <div className={styles.cartItems}>
                    {cart.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemImageContainer}>
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className={styles.itemImage}
                                    />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>No Image</div>
                                )}
                            </div>

                            <div className={styles.itemDetails}>
                                <span className={styles.itemCategory}>{item.category}</span>
                                <Link href={`/product/${item.id}`}>
                                    <h3>{item.name}</h3>
                                </Link>
                                <div className={styles.itemPrice}>${item.price.toLocaleString()}</div>

                                <div className={styles.quantityControls}>
                                    <button
                                        className={styles.qtyBtn}
                                        onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className={styles.qtyBtn}
                                        onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                            <button
                                className={styles.removeBtn}
                                onClick={() => removeFromCart(item.id!)}
                                aria-label="Remove item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <h2 className={styles.summaryTitle}>Order Summary</h2>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Tax (Est.)</span>
                        <span>${(cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <span>${(cartTotal * 1.08).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>

                    <Link href="/checkout">
                        <button className={styles.checkoutBtn}>Proceed to Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
