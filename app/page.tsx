'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/db';
import type { Product } from '@/lib/db';
import styles from './page.module.css';

export default function Home() {
  const [rangeImages, setRangeImages] = useState<{ [key: string]: string }>({
    '10-500': 'https://images.unsplash.com/photo-1596942901968-0708cb83a8c3?auto=format&fit=crop&q=80&w=600',
    '500-2000': 'https://images.unsplash.com/photo-1617038224531-16d4d2a550d5?auto=format&fit=crop&q=80&w=600',
    '2000-5000': 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=600'
  });

  useEffect(() => {
    async function loadDynamicImages() {
      try {
        const products = await getProducts();

        const newImages = { ...rangeImages };

        // Find one product for each range to use as a cover
        const ranges = [
          { id: '10-500', min: 10, max: 500 },
          { id: '500-2000', min: 500, max: 2000 },
          { id: '2000-5000', min: 2000, max: 5000 }
        ];

        ranges.forEach(range => {
          // Special case for Premium Selection: try to find "Almond Shaped Sapphire" first
          if (range.id === '2000-5000') {
            const specificProduct = products.find(p => p.name.toLowerCase().includes('almond shaped sapphire'));
            if (specificProduct && specificProduct.image) {
              newImages[range.id] = specificProduct.image;
              return; // Move to next range
            }
          }

          const productInRange = products.find(p => p.price >= range.min && p.price <= range.max);
          if (productInRange && productInRange.image) {
            newImages[range.id] = productInRange.image;
          }
        });

        setRangeImages(newImages);
      } catch (error) {
        console.error('Error loading dynamic range images:', error);
      }
    }
    loadDynamicImages();
  }, []);

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
              backgroundImage: `url('${rangeImages['10-500']}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <h3>Under $500</h3>
          </Link>
          <Link href="/shop?range=500-2000" className={styles.categoryCard}>
            <div className={styles.catImage} style={{
              backgroundColor: '#f1f5f9',
              backgroundImage: `url('${rangeImages['500-2000']}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <h3>$500 - $2,000</h3>
          </Link>
          <Link href="/shop?range=2000-5000" className={styles.categoryCard}>
            <div className={styles.catImage} style={{
              backgroundColor: '#e2e8f0',
              backgroundImage: `url('${rangeImages['2000-5000']}')`,
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

