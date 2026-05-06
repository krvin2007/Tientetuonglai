'use client';

import Link from 'next/link';
import { Gavel } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { getCategoryEmoji, getVipLabel } from '@/lib/utils';
import { categories, type Auction } from '@/lib/mock-data';
import styles from './AuctionCard.module.css';

interface AuctionCardProps {
  auction: Auction;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const category = categories.find(c => c.id === auction.categoryId);

  return (
    <Link href={`/dau-gia/${auction.id}`} className={`${styles.card} ${auction.hotDeal ? styles.cardHot : ''}`}>
      <div className={styles.imageWrap}>
        <div className={styles.imagePlaceholder}>
          {getCategoryEmoji(auction.categoryId)}
        </div>
        <div className={styles.imageOverlay} />
        <div className={styles.badges}>
          {auction.hotDeal && (
            <span className={`${styles.badge} ${styles.badgeHot}`}>🔥 HOT</span>
          )}
          {auction.featured && (
            <span className={`${styles.badge} ${styles.badgeFeatured}`}>⭐ Nổi Bật</span>
          )}
          <span className={`${styles.badge} ${styles.badgeCategory}`}>
            {category?.icon} {category?.name}
          </span>
        </div>
        <div className={styles.bidCountBadge}>
          <Gavel size={12} className={styles.bidCountIcon} />
          {auction.bidCount} lượt
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{auction.title}</h3>

        <div className={styles.priceRow}>
          <div className={styles.priceSection}>
            <span className={styles.priceLabel}>Giá hiện tại</span>
            <span className={styles.priceValue}>{auction.currentPrice.toLocaleString('vi-VN')} SUI</span>
            <span className={styles.startPrice}>Khởi điểm: {auction.startPrice} SUI</span>
          </div>
        </div>

        <div className={styles.timerRow}>
          <span className={styles.timerLabel}>
            <span className={styles.liveIndicator} />
            Kết thúc sau
          </span>
          <CountdownTimer endTime={auction.endTime} size="sm" />
        </div>

        <div className={styles.sellerRow}>
          <div className={styles.sellerAvatar}>
            {auction.seller.name.charAt(0)}
          </div>
          <span className={styles.sellerName}>{auction.seller.name}</span>
          {auction.seller.vipTier !== 'none' && (
            <span className={styles.sellerVip}>{getVipLabel(auction.seller.vipTier)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
