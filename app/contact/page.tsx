import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import styles from '../about/About.module.css'; // Reusing About styles for consistency

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>
                <h1 className={styles.title}>Contact Us</h1>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <p>
                        We are here to assist you with any inquiries regarding our jewelry, custom orders,
                        or shipping. Please feel free to reach out to us using the details below.
                    </p>
                </section>

                <section className={styles.section}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Mail size={24} color="var(--color-primary)" />
                            <div>
                                <h3>Email Us</h3>
                                <p style={{ margin: 0 }}>support@carateluxe.com</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Phone size={24} color="var(--color-primary)" />
                            <div>
                                <h3>Call Us</h3>
                                <p style={{ margin: 0 }}>+61 400 123 456</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <MapPin size={24} color="var(--color-primary)" />
                            <div>
                                <h3>Visit Our Boutique</h3>
                                <p style={{ margin: 0 }}>44 Burlington Road, Homebush, NSW</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
