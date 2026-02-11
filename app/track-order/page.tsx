'use client';

import { useState } from 'react';
import { Package, Search } from 'lucide-react';

export default function TrackOrder() {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState<null | string>(null);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate tracking
        if (orderId.trim()) {
            setStatus('Processing');
        }
    };

    return (
        <div className="container section" style={{ maxWidth: '600px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Track Your Order</h1>

            <form onSubmit={handleTrack} style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                <input
                    type="text"
                    placeholder="Enter Order ID (e.g., ORD-123456)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    style={{ flex: 1, padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                />
                <button type="submit" className="btn">
                    <Search size={20} style={{ marginRight: '0.5rem' }} /> Track
                </button>
            </form>

            {status && (
                <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
                    <Package size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Order Status: {status}</h3>
                    <p style={{ color: '#64748b' }}>Your order is being prepared for shipping.</p>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', margin: '0 auto 0.5rem' }}></div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Ordered</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', margin: '0 auto 0.5rem' }}></div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Processing</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '12px', height: '12px', background: '#e2e8f0', borderRadius: '50%', margin: '0 auto 0.5rem' }}></div>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Shipped</span>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '12px', height: '12px', background: '#e2e8f0', borderRadius: '50%', margin: '0 auto 0.5rem' }}></div>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Delivered</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
