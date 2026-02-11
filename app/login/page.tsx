'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/account'); // Redirect to account page after login
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        }
    };

    return (
        <div className="container section" style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Login</h1>
            {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Login</button>
            </form>

            <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                Don't have an account? <Link href="/signup" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Sign up</Link>
            </p>
        </div>
    );
}
