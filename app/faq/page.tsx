'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import styles from '../about/About.module.css';

export default function FAQPage() {
    const [question, setQuestion] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question.trim()) {
            // Simulate API call
            setTimeout(() => {
                setIsSubmitted(true);
                setQuestion('');
                setTimeout(() => setIsSubmitted(false), 3000);
            }, 500);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>
                <h1 className={styles.title}>Frequently Asked Questions</h1>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>Are your diamonds certified?</h2>
                    <p>
                        Yes, all our solitaire diamonds above 0.5 carats come with a GIA or AGS certificate
                        verifying their authenticity and quality characteristics.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Do you offer custom designs?</h2>
                    <p>
                        Absolutely. We specialize in bespoke jewelry. You can work with our designers to create
                        a one-of-a-kind piece. Please contact us to start the process.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>How do I determine my ring size?</h2>
                    <p>
                        We offer a printable ring size guide on our website. Alternatively, we recommend visiting
                        a local jeweler for a professional measurement to ensure the perfect fit.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>What payment methods do you accept?</h2>
                    <p>
                        We accept all major credit cards (Visa, MasterCard, Amex) and PayPal.
                        We also offer financing options through selected partners.
                    </p>
                </section>

                <section className={styles.section} style={{ marginTop: '4rem', borderTop: '1px solid #e2e8f0', paddingTop: '3rem' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Still have a question?</h2>
                    <p>Can't find what you're looking for? Ask us directly and we'll get back to you shortly.</p>

                    {isSubmitted ? (
                        <div style={{ padding: '1.5rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '8px', marginTop: '1rem' }}>
                            <strong>Thank you!</strong> Your question has been sent to our team. We'll be in touch soon.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                            <textarea
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Type your question here..."
                                required
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1',
                                    fontFamily: 'inherit',
                                    fontSize: '1rem',
                                    resize: 'vertical',
                                    marginBottom: '1rem'
                                }}
                            />
                            <button type="submit" className="btn">
                                <Send size={18} style={{ marginRight: '0.5rem' }} /> Send Question
                            </button>
                        </form>
                    )}
                </section>
            </div>
        </div>
    );
}
