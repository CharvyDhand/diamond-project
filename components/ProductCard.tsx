import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/db';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className={styles.card}>
            <Link href={`/product/${product.id!}`}>
                <div className={styles.imageContainer}>
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className={styles.imagePlaceholder}>No Image</div>
                    )}
                </div>
                <div className={styles.content}>
                    <span className={styles.category}>{product.category}</span>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.price}>${product.price.toLocaleString()}</p>
                    <button className={styles.viewBtn}>View Details</button>
                </div>
            </Link>
        </div>
    );
}
