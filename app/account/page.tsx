'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserOrders, updateOrderStatus } from '@/lib/db';

interface Order {
    id: string;
    date: string;
    total: string;
    status: 'pending' | 'processing' | 'completed' | 'shipped' | 'cancelled' | 'return_requested' | 'refund_requested';
    reason?: string;
}

export default function AccountPage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        name: user?.displayName || 'Valued Customer',
        email: user?.email || 'customer@example.com'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState(profile);

    // Update profile state when user object becomes available
    useEffect(() => {
        if (user) {
            setProfile({
                name: user.displayName || 'Valued Customer',
                email: user.email || ''
            });
        }
    }, [user]);
    // Initial empty state for orders
    const [orders, setOrders] = useState<Order[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            if (user) {
                // Try to load from Firestore
                try {
                    console.log('Fetching orders for email:', user.email);
                    const firestoreOrders = await getUserOrders(user.email || ''); // Using email as user identifier in lib/db.ts

                    if (firestoreOrders && firestoreOrders.length > 0) {
                        const formattedOrders = firestoreOrders.map(o => ({
                            id: o.id || '',
                            date: o.createdAt?.seconds
                                ? new Date(o.createdAt.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                : 'Recent Order',
                            total: `$${o.total.toLocaleString()}`,
                            status: o.status,
                            reason: o.reason
                        }));
                        setOrders(formattedOrders);
                    } else {
                        setOrders([]);
                    }
                } catch (error) {
                    console.error('Error loading Firestore orders:', error);
                    setOrders([]);
                }
            } else {
                setOrders([]);
            }
            setLoading(false);
        };

        // Check for success message from request page
        const successMsg = localStorage.getItem('luxe-action-success');
        if (successMsg) {
            setMessage(successMsg);
            localStorage.removeItem('luxe-action-success');
            setTimeout(() => setMessage(null), 5000);
        }

        loadOrders();
    }, [user]);

    const handleEdit = () => {
        setTempUser(profile);
        setIsEditing(true);
    };

    const handleSave = () => {
        setProfile(tempUser);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempUser({ ...tempUser, [e.target.name]: e.target.value });
    };

    const handleCancelOrder = async (orderId: string) => {
        if (confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
            const reason = prompt('Please tell us why you are cancelling this order:');
            if (reason !== null) {
                try {
                    await updateOrderStatus(orderId, 'cancelled', reason);

                    // Update local state to show cancelled status immediately
                    setOrders(prev => prev.map(order =>
                        order.id === orderId ? { ...order, status: 'cancelled', reason: reason } : order
                    ));

                    alert('Order cancelled successfully. A refund has been initiated.');
                } catch (error) {
                    console.error('Error cancelling order:', error);
                    alert('Failed to cancel order. Please try again.');
                }
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return { bg: '#fef3c7', color: '#92400e' }; // Amber
            case 'processing': return { bg: '#dcfce7', color: '#166534' }; // Green
            case 'completed': return { bg: '#dbeafe', color: '#1e40af' }; // Blue
            case 'shipped': return { bg: '#e0e7ff', color: '#3730a3' }; // Indigo
            case 'cancelled': return { bg: '#fee2e2', color: '#991b1b' }; // Red
            case 'return_requested': return { bg: '#fef3c7', color: '#92400e' }; // Amber
            case 'refund_requested': return { bg: '#e0e7ff', color: '#3730a3' }; // Indigo
            default: return { bg: '#f3f4f6', color: '#374151' }; // Gray
        }
    };

    return (
        <div className="container section">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Account</h1>

            {message && (
                <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '8px' }}>
                    {message}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>
                <div>
                    <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '8px' }}>
                        <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Profile</h3>

                        {isEditing ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={tempUser.name}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={tempUser.email}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <button onClick={handleSave} className="btn" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>Save</button>
                                    <button onClick={handleCancel} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p style={{ marginBottom: '0.5rem' }}><strong>Name:</strong> {profile.name}</p>
                                <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> {profile.email}</p>
                                <button onClick={handleEdit} className="btn btn-secondary" style={{ marginTop: '1rem', width: '100%' }}>Edit Profile</button>
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order History</h3>
                    <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                        {orders.map((order) => {
                            const statusStyle = getStatusColor(order.status);
                            return (
                                <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', borderBottom: '1px solid #e2e8f0', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Order #{order.id}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{order.date}</div>
                                        {(order.status === 'processing' || order.status === 'pending') && (
                                            <button
                                                onClick={() => handleCancelOrder(order.id)}
                                                className="btn btn-secondary"
                                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', marginTop: '0.5rem', color: '#ef4444', borderColor: '#ef4444' }}
                                            >
                                                Cancel & Refund
                                            </button>
                                        )}
                                        {order.status === 'completed' && (
                                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                <Link
                                                    href={`/account/requests?orderId=${order.id}&type=return`}
                                                    className="btn btn-secondary"
                                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', textDecoration: 'none' }}
                                                >
                                                    Return Item
                                                </Link>
                                                <Link
                                                    href={`/account/requests?orderId=${order.id}&type=refund`}
                                                    className="btn btn-secondary"
                                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', textDecoration: 'none' }}
                                                >
                                                    Request Refund
                                                </Link>
                                            </div>
                                        )}
                                        {order.reason && (
                                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', fontStyle: 'italic' }}>
                                                Reason: "{order.reason}"
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 600 }}>{order.total}</div>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            background: statusStyle.bg,
                                            color: statusStyle.color,
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            display: 'inline-block',
                                            marginTop: '0.25rem'
                                        }}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
