'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from '../../about/About.module.css'; // Reusing layout styles

// Component that wraps search params logic
function RequestForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const actionType = searchParams.get('type') as 'return' | 'refund' | null;

    const [reason, setReason] = useState('');
    const [selectedAction, setSelectedAction] = useState<'return' | 'refund'>(actionType || 'return');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update selected action if URL param changes
    useEffect(() => {
        if (actionType) setSelectedAction(actionType);
    }, [actionType]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!reason.trim()) {
            alert('Please provide a valid reason.');
            return;
        }

        setIsSubmitting(true);

        // Simulate network delay and update local storage
        setTimeout(() => {
            const savedOrders = localStorage.getItem('luxe-orders');
            if (savedOrders) {
                const orders = JSON.parse(savedOrders);
                const updatedOrders = orders.map((order: any) => {
                    if (order.id === orderId) {
                        return {
                            ...order,
                            status: selectedAction === 'return' ? 'Return Requested' : 'Refund Requested',
                            reason: reason
                        };
                    }
                    return order;
                });
                localStorage.setItem('luxe-orders', JSON.stringify(updatedOrders));
                localStorage.setItem('luxe-action-success', `Successfully submitted ${selectedAction} request for ${orderId}`);
            }

            router.push('/account');
        }, 1000);
    };

    if (!orderId) {
        return <div className={styles.content}><p>Invalid order reference.</p></div>;
    }

    return (
        <div className={styles.content} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                    {selectedAction === 'return' ? 'Request Item Return' : 'Request Refund'}
                </h2>

                <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>
                    Reference: <strong>{orderId}</strong>
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Action Type
                        </label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="action"
                                    value="return"
                                    checked={selectedAction === 'return'}
                                    onChange={() => setSelectedAction('return')}
                                />
                                Return Item
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="action"
                                    value="refund"
                                    checked={selectedAction === 'refund'}
                                    onChange={() => setSelectedAction('refund')}
                                />
                                Request Refund
                            </label>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label className={styles.label} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Reason for Request <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                            placeholder={`Please describe why you are requesting a ${selectedAction}...`}
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                padding: '0.75rem',
                                borderRadius: '4px',
                                border: '1px solid #cbd5e1',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        disabled={isSubmitting}
                        style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>

                    <Link href="/account" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default function RequestPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/account" className={styles.backLink}>
                    <ArrowLeft size={20} /> Back to My Account
                </Link>
            </div>

            <Suspense fallback={<div>Loading form...</div>}>
                <RequestForm />
            </Suspense>
        </div>
    );
}
