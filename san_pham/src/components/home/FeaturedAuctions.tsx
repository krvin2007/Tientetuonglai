import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AuctionCard from '@/components/auction/AuctionCard';
import { auctions } from '@/lib/mock-data';
import styles from './FeaturedAuctions.module.css';

export default function FeaturedAuctions() {
  const featured = auctions.filter(a => a.featured).slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className="section-title">
            Đấu Giá <span className="gradient-text">Nổi Bật</span>
          </h2>
          <p className="section-subtitle">Các phiên đấu giá được quan tâm nhiều nhất</p>
        </div>
        <Link href="/dau-gia" className={styles.viewAll}>
          Xem tất cả <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.grid}>
        {featured.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </section>
  );
}
