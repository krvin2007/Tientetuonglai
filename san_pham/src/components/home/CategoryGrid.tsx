import Link from 'next/link';
import { categories } from '@/lib/mock-data';
import styles from './CategoryGrid.module.css';

export default function CategoryGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className="section-title">
          Danh Mục <span className="gradient-text">Tài Sản</span>
        </h2>
        <p className="section-subtitle">Khám phá đa dạng loại tài sản được đấu giá trên nền tảng</p>
      </div>

      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/dau-gia?category=${cat.id}`}
            className={styles.card}
            style={{ '--card-gradient': cat.gradient } as React.CSSProperties}
          >
            <span className={styles.icon}>{cat.icon}</span>
            <h3 className={styles.name}>{cat.name}</h3>
            <p className={styles.description}>{cat.description}</p>
            <span className={styles.count}>{cat.count} sản phẩm</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
