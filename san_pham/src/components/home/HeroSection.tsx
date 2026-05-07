'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gavel, Plus } from 'lucide-react';
import CountdownTimer from '@/components/auction/CountdownTimer';
import { auctions, platformStats } from '@/lib/mock-data';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const spotlightAuction = auctions[1]; // Dragon Lore - most exciting
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroBg} />
      <div className={styles.heroGrid}>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>
            <span className={styles.heroTagDot} />
            {platformStats.activeAuctions} phiên đấu giá đang diễn ra
          </div>

          <h1 className={styles.heroTitle}>
            Đấu Giá Tài Sản
            <br />
            <span className={styles.heroTitleLine2}>Trên Blockchain SUI</span>
          </h1>

          <p className={styles.heroDesc}>
            Nền tảng đấu giá trực tuyến đa dạng tài sản – từ đồ gia dụng, vật phẩm game,
            thời trang đến đồ cổ. Mọi giao dịch đều minh bạch và được ghi nhận trên blockchain SUI.
          </p>

          <div className={styles.heroActions}>
            <Link href="/dau-gia" className={styles.heroBtnPrimary}>
              <Gavel size={18} />
              Khám Phá Đấu Giá
            </Link>
            <Link href="/tao-dau-gia" className={styles.heroBtnSecondary}>
              <Plus size={18} />
              Đăng Bán
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>
                {isMounted ? platformStats.totalAuctions.toLocaleString('vi-VN') : '...'}
              </span>
              <span className={styles.heroStatLabel}>Phiên đấu giá</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>
                {isMounted ? platformStats.totalUsers.toLocaleString('vi-VN') : '...'}
              </span>
              <span className={styles.heroStatLabel}>Người dùng</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>
                {(platformStats.totalVolumeSUI / 1000000).toFixed(1)}M
              </span>
              <span className={styles.heroStatLabel}>SUI giao dịch</span>
            </div>
          </div>
        </div>

        <div className={styles.heroSpotlight}>
          <div className={styles.spotlightCard}>
            <div className={styles.spotlightTag}>
              <span className={styles.spotlightLive} />
              ĐANG DIỄN RA
            </div>

            <div className={styles.spotlightImage}>
              {spotlightAuction.images && spotlightAuction.images.length > 0 ? (
                <img 
                  src={spotlightAuction.images[0]} 
                  alt={spotlightAuction.title} 
                  className={styles.image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '🎮';
                  }}
                />
              ) : (
                '🎮'
              )}
            </div>

            <h2 className={styles.spotlightTitle}>{spotlightAuction.title}</h2>

            <div className={styles.spotlightPrice}>
              <div>
                <span className={styles.spotlightPriceVal}>
                  {isMounted ? spotlightAuction.currentPrice.toLocaleString('vi-VN') : '...'}
                </span>
                <span className={styles.spotlightPriceSUI}> SUI</span>
              </div>
              <span className={styles.spotlightBids}>
                <Gavel size={14} />
                {spotlightAuction.bidCount} lượt đấu giá
              </span>
            </div>

            <div className={styles.spotlightTimer}>
              <CountdownTimer endTime={spotlightAuction.endTime} size="lg" />
            </div>

            <Link href={`/dau-gia/${spotlightAuction.id}`} className={styles.spotlightBidBtn}>
              <Gavel size={18} />
              Đấu Giá Ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
