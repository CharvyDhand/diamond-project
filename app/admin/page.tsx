'use client';

import { useEffect, useState } from 'react';
import { getAllOrders } from '@/lib/db';
import type { Order } from '@/lib/db';
import Link from 'next/link';
import styles from './Admin.module.css';

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const allOrders = await getAllOrders();
            setOrders(allOrders);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const recentOrders = orders.slice(0, 5);

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

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Dashboard</h1>
            </div>

            <div className={styles.dashboardGrid}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Total Revenue</h3>
                    <p className={styles.cardValue}>
                        {loading ? '...' : `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                    </p>
                    <span style={{ color: '#22c55e', fontSize: '0.9rem' }}>From all orders</span>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Total Orders</h3>
                    <p className={styles.cardValue}>{loading ? '...' : orders.length}</p>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>All time</span>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Pending Orders</h3>
                    <p className={styles.cardValue}>
                        {loading ? '...' : orders.filter(o => o.status === 'pending').length}
                    </p>
                    <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>Needs attention</span>
                </div>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Completed</h3>
                    <p className={styles.cardValue}>
                        {loading ? '...' : orders.filter(o => o.status === 'completed').length}
                    </p>
                    <span style={{ color: '#22c55e', fontSize: '0.9rem' }}>Successfully delivered</span>
                </div>
            </div>

            <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 className={styles.cardTitle} style={{ fontSize: '1.25rem', margin: 0 }}>Recent Orders</h2>
                    <Link href="/admin/orders" style={{ color: '#667eea', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                        View All →
                    </Link>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Loading orders...</p>
                ) : recentOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        <p style={{ fontSize: '1.1rem' }}>No orders yet</p>
                        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Orders will appear here when customers make purchases</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '1rem' }}>Order ID</th>
                                <th style={{ padding: '1rem' }}>Customer</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(order => {
                                const statusColors = getStatusColor(order.status);
                                return (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                            #{order.id?.substring(0, 8)}
                                        </td>
                                        <td style={{ padding: '1rem' }}>{order.customerName}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                background: statusColors.bg,
                                                color: statusColors.text,
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                                textTransform: 'capitalize'
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: 600 }}>
                                            ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
