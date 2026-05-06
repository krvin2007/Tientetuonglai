import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AuctionCard from '@/components/auction/AuctionCard';
import { auctions } from '@/lib/mock-data';
import styles from './HotDeals.module.css';

export default function HotDeals() {
  const hotDeals = auctions.filter(a => a.hotDeal).slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className="section-title">
            🔥 Đấu Giá <span className="gradient-text-gold">Sắp Kết Thúc</span>
          </h2>
          <p className="section-subtitle">Nhanh tay! Các phiên đấu giá sắp đóng</p>
        </div>
        <Link href="/dau-gia" className={styles.viewAll}>
          Xem thêm <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.grid}>
        {hotDeals.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </section>
  );
}
