'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/db';
import type { ShippingAddress } from '@/lib/db';
import styles from './Checkout.module.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, cartTotal, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPayPal, setShowPayPal] = useState(false);
    const [formData, setFormData] = useState<ShippingAddress>({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        email: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowPayPal(true);
    };

    const saveOrderToFirebase = async (paymentId: string) => {
        try {
            console.log('Starting order save to Firebase...', { paymentId });
            const tax = cartTotal * 0.08;
            const total = cartTotal + tax;

            const orderId = await createOrder({
                customerEmail: formData.email,
                customerName: `${formData.firstName} ${formData.lastName}`,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                subtotal: cartTotal,
                tax: tax,
                total: total,
                status: 'pending',
                shippingAddress: formData,
                paymentMethod: 'PayPal',
                paymentId: paymentId,
            });

            console.log('Order successfully saved with ID:', orderId);
            return orderId;
        } catch (error) {
            console.error('CRITICAL ERROR: Failed to save order to Firebase:', error);
            throw error;
        }
    };

    if (cart.length === 0) {
        if (typeof window !== 'undefined') {
            router.push('/cart');
        }
        return null;
    }

    const tax = cartTotal * 0.08;
    const total = cartTotal + tax;

    const paypalOptions = {
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb',  // sandbox default
        currency: 'USD',
        intent: 'capture' as const,
    };

    return (
        <div className={styles.container}>
            <div className={styles.formSection}>
                <form id="checkout-form" onSubmit={handleSubmit}>
                    <h2 className={styles.sectionTitle}>Shipping Information</h2>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>First Name</label>
                            <input
                                required
                                type="text"
                                name="firstName"
                                className={styles.input}
                                value={formData.firstName}
                                onChange={handleInputChange}
                                disabled={showPayPal}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Last Name</label>
                            <input
                                required
                                type="text"
                                name="lastName"
                                className={styles.input}
                                value={formData.lastName}
                                onChange={handleInputChange}
                                disabled={showPayPal}
                            />
                        </div>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Address</label>
                            <input
                                required
                                type="text"
                                name="address"
                                className={styles.input}
                                value={formData.address}
                                onChange={handleInputChange}
                                disabled={showPayPal}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>City</label>
                            <input
                                required
                                type="text"
                                name="city"
                                className={styles.input}
                                value={formData.city}
                                onChange={handleInputChange}
                                disabled={showPayPal}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Postal Code</label>
                            <input
                                required
                                type="text"
                                name="postalCode"
                                className={styles.input}
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                disabled={showPayPal}
                            />
                        </div>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={showPayPal}
                            />
                        </div>
                    </div>

                    {!showPayPal && (
                        <button
                            type="submit"
                            className={styles.payBtn}
                            style={{ marginTop: '1.5rem' }}
                        >
                            Continue to Payment
                        </button>
                    )}
                </form>
            </div>

            <div className={styles.summarySection}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                {cart.map(item => (
                    <div key={item.id} className={styles.orderItem}>
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                ))}

                <div className={styles.orderItem} style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', marginTop: '1rem' }}>
                    <span>Subtotal</span>
                    <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className={styles.orderItem}>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.orderItem} style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a' }}>
                    <span>Total</span>
                    <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                {showPayPal && (
                    <div style={{ marginTop: '1.5rem' }}>
                        <PayPalScriptProvider options={paypalOptions}>
                            <PayPalButtons
                                style={{ layout: 'vertical', label: 'pay' }}
                                disabled={isProcessing}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        intent: 'CAPTURE',
                                        purchase_units: [{
                                            amount: {
                                                currency_code: 'USD',
                                                value: total.toFixed(2),
                                            },
                                            description: `Order from ${formData.firstName} ${formData.lastName}`,
                                        }],
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    setIsProcessing(true);
                                    try {
                                        const details = await actions.order!.capture();
                                        const orderId = await saveOrderToFirebase(details.id || data.orderID);
                                        clearCart();
                                        router.push(`/order-confirmation?orderId=${orderId}`);
                                    } catch (error: any) {
                                        console.error('Payment error:', error);
                                        alert(`Payment completed, but we couldn't save your order: ${error.message || 'Unknown error'}. Please contact support.`);
                                        setIsProcessing(false);
                                    }
                                }}
                                onError={(err) => {
                                    console.error('PayPal error:', err);
                                    alert('An error occurred with PayPal. Please try again.');
                                    setIsProcessing(false);
                                }}
                            />
                        </PayPalScriptProvider>
                        <button
                            onClick={() => setShowPayPal(false)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                marginTop: '1rem',
                                background: '#f1f5f9',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                color: '#64748b',
                                fontWeight: 500
                            }}
                        >
                            ← Back to Shipping Info
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
