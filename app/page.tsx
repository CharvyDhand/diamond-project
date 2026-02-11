import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Exquisite Gems, <br /> Timeless Elegance.</h1>
          <p>Discover our exclusive collection of hand-picked, vibrant gemstones and jewelry.</p>
          <div className={styles.heroButtons}>
            <Link href="/shop" className="btn">Shop Now</Link>
            <Link href="/about" className="btn btn-secondary" style={{ color: 'white', borderColor: 'white' }}>Our Story</Link>
          </div>
        </div>
      </section>

      {/* Categories by Price */}
      <section className="container section">
        <div className={styles.sectionHeader}>
          <h2>Shop by Price Range</h2>
          <Link href="/shop" className={styles.viewAll}>Explore All <ArrowRight size={16} /></Link>
        </div>

        <div className={styles.categoryGrid}>
          <Link href="/shop?range=10-500" className={styles.categoryCard}>
            <div className={styles.catImage} style={{
              backgroundColor: '#f8fafc',
              backgroundImage: "url('https://images.unsplash.com/photo-1596942901968-0708cb83a8c3?auto=format&fit=crop&q=80&w=600')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <h3>Under $500</h3>
          </Link>
          <Link href="/shop?range=500-2000" className={styles.categoryCard}>
            <div className={styles.catImage} style={{
              backgroundColor: '#f1f5f9',
              backgroundImage: "url('https://images.unsplash.com/photo-1617038224531-16d4d2a550d5?auto=format&fit=crop&q=80&w=600')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <h3>$500 - $2,000</h3>
          </Link>
          <Link href="/shop?range=2000-5000" className={styles.categoryCard}>
            <div className={styles.catImage} style={{
              backgroundColor: '#e2e8f0',
              backgroundImage: "url('https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=600')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <h3>Premium Selection</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
