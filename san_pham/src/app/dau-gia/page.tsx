'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuctionCard from '@/components/auction/AuctionCard';
import { auctions, categories } from '@/lib/mock-data';
import styles from './page.module.css';

export default function AuctionListPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredAuctions = auctions
    .filter(a => activeCategory === 'all' || a.categoryId === activeCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-high':
          return b.currentPrice - a.currentPrice;
        case 'price-low':
          return a.currentPrice - b.currentPrice;
        case 'ending-soon':
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        case 'most-bids':
          return b.bidCount - a.bidCount;
        default:
          return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
      }
    });

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Tất Cả <span className="gradient-text">Đấu Giá</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Khám phá hàng trăm phiên đấu giá đa dạng tài sản trên blockchain SUI
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <button
              className={`${styles.filterChip} ${activeCategory === 'all' ? styles.filterChipActive : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Tất cả
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.filterChip} ${activeCategory === cat.id ? styles.filterChipActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Mới nhất</option>
            <option value="ending-soon">Sắp kết thúc</option>
            <option value="price-high">Giá cao nhất</option>
            <option value="price-low">Giá thấp nhất</option>
            <option value="most-bids">Nhiều lượt đấu giá</option>
          </select>
        </div>

        <p className={styles.resultsCount}>
          Hiển thị <strong>{filteredAuctions.length}</strong> phiên đấu giá
        </p>

        <div className={styles.auctionGrid}>
          {filteredAuctions.map(auction => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
