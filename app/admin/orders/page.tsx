'use client';

import React, { useEffect, useState } from 'react';
import { getAllOrders } from '@/lib/db';
import type { Order } from '@/lib/db';
import styles from '../Admin.module.css';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | Order['status']>('all');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const allOrders = await getAllOrders();
            setOrders(allOrders);
        } catch (err: any) {
            console.error('Error loading orders:', err);
            setError(err.message || 'Failed to load orders.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
        setUpdatingStatus(orderId);
        try {
            const { updateOrderStatus } = await import('@/lib/db');
            await updateOrderStatus(orderId, newStatus);

            // Update local state
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err: any) {
            alert('Failed to update status: ' + err.message);
        } finally {
            setUpdatingStatus(null);
        }
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status === filter);

    const toggleOrderValue = (orderId: string | undefined) => {
        if (!orderId) return;
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const getStatusColor = (status: Order['status']) => {
        const colors: Record<string, { bg: string, text: string }> = {
            pending: { bg: '#fef3c7', text: '#92400e' },
            processing: { bg: '#dbeafe', text: '#1e40af' },
            completed: { bg: '#dcfce7', text: '#166534' },
            shipped: { bg: '#e0e7ff', text: '#3730a3' },
            cancelled: { bg: '#fee2e2', text: '#991b1b' },
            return_requested: { bg: '#fef3c7', text: '#92400e' },
            refund_requested: { bg: '#e0e7ff', text: '#3730a3' },
        };
        return colors[status as string] || colors.pending;
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Invalid date';
        }
    };

    if (loading) {
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Orders</h1>
                </div>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <p>Loading orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Orders</h1>
                </div>
                <div className={styles.card} style={{ textAlign: 'center', padding: '3rem', color: '#991b1b', background: '#fee2e2' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>⚠️ Error</h2>
                    <p>{error}</p>
                    <button
                        onClick={loadOrders}
                        style={{
                            marginTop: '1.5rem',
                            padding: '0.75rem 1.5rem',
                            background: '#991b1b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Orders ({orders.length})</h1>
            </div>

            <div className={styles.card}>
                {/* Filter Tabs */}
                <div style={{ borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {['all', 'pending', 'processing', 'shipped', 'completed', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status as any)}
                                style={{
                                    padding: '0.75rem 1rem',
                                    border: 'none',
                                    background: 'transparent',
                                    borderBottom: filter === status ? '2px solid #667eea' : '2px solid transparent',
                                    color: filter === status ? '#667eea' : '#64748b',
                                    fontWeight: filter === status ? 600 : 400,
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        <p style={{ fontSize: '1.1rem' }}>No {filter !== 'all' ? filter : ''} orders found</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Orders will appear here when customers make purchases
                        </p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>Order ID</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>Customer</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>Total</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>Status</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>Date</th>
                                    <th style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => {
                                    const statusColors = getStatusColor(order.status);
                                    const isExpanded = expandedOrder === order.id;

                                    return (
                                        <React.Fragment key={order.id}>
                                            <tr
                                                style={{
                                                    borderBottom: isExpanded ? 'none' : '1px solid #f1f5f9',
                                                    background: isExpanded ? '#f8fafc' : 'transparent',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => toggleOrderValue(order.id)}
                                            >
                                                <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                                    #{order.id?.substring(0, 8)}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ fontWeight: 500 }}>{order.customerName}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{order.customerEmail}</div>
                                                </td>
                                                <td style={{ padding: '1rem', fontWeight: 600 }}>
                                                    ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        background: statusColors.bg,
                                                        color: statusColors.text,
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '12px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 600,
                                                        textTransform: 'capitalize'
                                                    }}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                                                    {formatDate(order.createdAt)}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <button
                                                        style={{
                                                            background: '#667eea',
                                                            color: 'white',
                                                            border: 'none',
                                                            padding: '0.4rem 0.8rem',
                                                            borderRadius: '6px',
                                                            fontSize: '0.85rem',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {isExpanded ? 'Hide' : 'View'}
                                                    </button>
                                                </td>
                                            </tr>
                                            {isExpanded && (
                                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                                                    <td colSpan={6} style={{ padding: '1.5rem', paddingTop: 0 }}>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                                            <div>
                                                                <h4 style={{ margin: '0 0 1rem 0', color: '#334155', fontSize: '1rem' }}>Shipping Details</h4>
                                                                <div style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                                                                    <p><strong>Address:</strong> {order.shippingAddress.address}</p>
                                                                    <p><strong>City:</strong> {order.shippingAddress.city}</p>
                                                                    <p><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</p>
                                                                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                                                    <p><strong>Payment ID:</strong> <span style={{ fontFamily: 'monospace' }}>{order.paymentId || 'N/A'}</span></p>
                                                                </div>

                                                                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                                                                    <h4 style={{ margin: '0 0 0.75rem 0', color: '#334155', fontSize: '0.9rem' }}>Update Order Status</h4>
                                                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                                        {['pending', 'processing', 'shipped', 'completed', 'cancelled'].map((status) => (
                                                                            <button
                                                                                key={status}
                                                                                disabled={updatingStatus === order.id}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleStatusUpdate(order.id!, status as any);
                                                                                }}
                                                                                style={{
                                                                                    padding: '0.4rem 0.6rem',
                                                                                    fontSize: '0.75rem',
                                                                                    borderRadius: '4px',
                                                                                    border: '1px solid #e2e8f0',
                                                                                    background: order.status === status ? '#667eea' : 'white',
                                                                                    color: order.status === status ? 'white' : '#64748b',
                                                                                    cursor: updatingStatus === order.id ? 'not-allowed' : 'pointer',
                                                                                    textTransform: 'capitalize'
                                                                                }}
                                                                            >
                                                                                {status}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                    {updatingStatus === order.id && (
                                                                        <p style={{ fontSize: '0.75rem', color: '#667eea', marginTop: '0.5rem' }}>Updating...</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 style={{ margin: '0 0 1rem 0', color: '#334155', fontSize: '1rem' }}>Order Items</h4>
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                                    {order.items.map((item, idx) => (
                                                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                                                                            <span>{item.name} <strong>x{item.quantity}</strong></span>
                                                                            <span style={{ fontWeight: 500 }}>${(item.price * item.quantity).toLocaleString()}</span>
                                                                        </div>
                                                                    ))}
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontWeight: 600, color: '#0f172a' }}>
                                                                        <span>Total</span>
                                                                        <span>${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
