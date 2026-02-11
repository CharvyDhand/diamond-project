import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './About.module.css';

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>
                <h1 className={styles.title}>Our Story</h1>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2>The Beginning of Brilliance</h2>
                    <p>
                        Welcome to <strong>Caraté Luxe</strong>, where passion meets perfection.
                        Our journey began with a simple yet profound vision: to bring the world's most
                        ethically sourced and brilliantly crafted diamonds to those who cherish eternal moments.
                    </p>
                    <p>
                        Established in Sydney, we have grown from a boutique jeweler to a trusted name in luxury.
                        Every diamond in our collection is hand-selected by our expert gemologists, ensuring that
                        only the finest stones make it to your jewelry box.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Ethical Sourcing & Craftsmanship</h2>
                    <p>
                        At Caraté Luxe, we believe that true beauty should never come at a cost to the earth or its people.
                        That's why we are committed to conflict-free sourcing and sustainable practices.
                        Our master craftsmen blend traditional techniques with modern innovation to create pieces
                        that are not just jewelry, but heirlooms to be passed down through generations.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>A Promise of Quality</h2>
                    <p>
                        We stand behind every piece we create. From the initial sketch to the final polish,
                        our dedication to quality is unwavering. When you choose Caraté Luxe, you are choosing
                        transparency, integrity, and a brilliance that lasts forever.
                    </p>
                </section>
            </div>
        </div>
    );
}
