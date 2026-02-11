'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/account'); // Redirect to account page after signup
        } catch (err: any) {
            setError(err.message || 'Failed to create account');
        }
    };

    return (
        <div className="container section" style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Create Account</h1>
            {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Sign Up</button>
            </form>

            <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                Already have an account? <Link href="/login" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Login</Link>
            </p>
        </div>
    );
}
