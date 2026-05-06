'use client';

import { useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Gavel, Clock, Star, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CountdownTimer from '@/components/auction/CountdownTimer';
import { auctions, mockBids, categories } from '@/lib/mock-data';
import { getCategoryEmoji, getVipLabel, formatRelativeTime, formatDate } from '@/lib/utils';
import styles from './page.module.css';

export default function AuctionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const auction = auctions.find(a => a.id === id);
  const bids = mockBids.filter(b => b.auctionId === id);
  const category = categories.find(c => c.id === auction?.categoryId);

  const [bidAmount, setBidAmount] = useState('');

  if (!auction) {
    return (
      <>
        <Header />
        <main className={styles.page}>
          <div className={styles.notFound}>
            <div className={styles.notFoundIcon}>🔍</div>
            <h1 className={styles.notFoundTitle}>Không tìm thấy phiên đấu giá</h1>
            <p className={styles.notFoundDesc}>Phiên đấu giá này không tồn tại hoặc đã bị xóa.</p>
            <Link href="/dau-gia" className={styles.notFoundBtn}>
              <ArrowLeft size={16} />
              Quay lại danh sách
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const minBid = auction.currentPrice + auction.minBidIncrement;

  const getRankClass = (index: number) => {
    switch (index) {
      case 0: return styles.historyRank1;
      case 1: return styles.historyRank2;
      case 2: return styles.historyRank3;
      default: return styles.historyRankDefault;
    }
  };

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.inner}>
          <Link href="/dau-gia" className={styles.backLink}>
            <ArrowLeft size={16} />
            Quay lại danh sách đấu giá
          </Link>

          <div className={styles.detailGrid}>
            {/* Left Column */}
            <div className={styles.leftCol}>
              <div className={styles.imageMain}>
                {getCategoryEmoji(auction.categoryId)}
                <div className={styles.imageBadges}>
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
              </div>

              <div className={styles.infoCard}>
                <h1 className={styles.title}>{auction.title}</h1>
                <p className={styles.desc}>{auction.description}</p>

                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Danh mục</div>
                    <div className={styles.metaValue}>{category?.icon} {category?.name}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Giá khởi điểm</div>
                    <div className={styles.metaValue}>{auction.startPrice} SUI</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Bước giá tối thiểu</div>
                    <div className={styles.metaValue}>{auction.minBidIncrement} SUI</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Bắt đầu</div>
                    <div className={styles.metaValue}>{formatDate(auction.startTime)}</div>
                  </div>
                </div>
              </div>

              {/* Bid History */}
              <div className={styles.historyCard}>
                <h3 className={styles.historyTitle}>
                  <Clock size={16} />
                  Lịch Sử Đấu Giá ({bids.length})
                </h3>
                <div className={styles.historyList}>
                  {bids.length > 0 ? bids.map((bid, index) => (
                    <div key={bid.id} className={styles.historyItem}>
                      <div className={`${styles.historyRank} ${getRankClass(index)}`}>
                        {index + 1}
                      </div>
                      <div className={styles.historyBidder}>
                        <div className={styles.historyBidderName}>{bid.bidder.name}</div>
                        <div className={styles.historyTime}>{formatRelativeTime(bid.timestamp)}</div>
                      </div>
                      <div className={styles.historyAmount}>{bid.amount.toLocaleString()} SUI</div>
                    </div>
                  )) : (
                    <p style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: '20px' }}>
                      Chưa có lượt đấu giá nào
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.rightCol}>
              {/* Bid Card */}
              <div className={styles.bidCard}>
                <div className={styles.bidTimerLabel}>
                  <span className={styles.liveIndicator} />
                  Kết thúc sau
                </div>
                <div className={styles.bidTimerWrap}>
                  <CountdownTimer endTime={auction.endTime} size="lg" />
                </div>

                <div className={styles.currentPriceWrap}>
                  <div className={styles.currentPriceLabel}>Giá hiện tại</div>
                  <div className={styles.currentPrice}>
                    {auction.currentPrice.toLocaleString()}
                    <span className={styles.currentPriceSUI}> SUI</span>
                  </div>
                </div>

                <div className={styles.bidStats}>
                  <div className={styles.bidStatItem}>
                    <div className={styles.bidStatValue}>{auction.bidCount}</div>
                    <div className={styles.bidStatLabel}>Lượt đấu giá</div>
                  </div>
                  <div className={styles.bidStatItem}>
                    <div className={styles.bidStatValue}>⭐ {auction.seller.rating}</div>
                    <div className={styles.bidStatLabel}>Đánh giá</div>
                  </div>
                </div>

                <div className={styles.bidInputGroup}>
                  <label className={styles.bidInputLabel}>Số tiền đấu giá (SUI)</label>
                  <div className={styles.bidInputWrap}>
                    <input
                      type="number"
                      className={styles.bidInput}
                      placeholder={`Tối thiểu ${minBid}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={minBid}
                      step={auction.minBidIncrement}
                    />
                    <span className={styles.bidCurrency}>SUI</span>
                  </div>
                  <p className={styles.bidMinNote}>
                    Tối thiểu: {minBid} SUI (bước giá: {auction.minBidIncrement} SUI)
                  </p>
                </div>

                <button className={styles.bidBtn}>
                  <Gavel size={18} />
                  Đặt Giá
                </button>

                <p className={styles.bidNote}>
                  <Shield size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                  Giao dịch được bảo vệ bởi SUI Smart Contract
                </p>
              </div>

              {/* Seller Card */}
              <div className={styles.sellerCard}>
                <div className={styles.sellerAvatar}>
                  {auction.seller.name.charAt(0)}
                </div>
                <div className={styles.sellerInfo}>
                  <div className={styles.sellerName}>{auction.seller.name}</div>
                  <div className={styles.sellerMeta}>
                    <span><Star size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {auction.seller.rating}</span>
                    <span>{auction.seller.totalAuctions} đấu giá</span>
                  </div>
                </div>
                {auction.seller.vipTier !== 'none' && (
                  <span
                    className={styles.sellerVip}
                    style={{
                      background: `rgba(${auction.seller.vipTier === 'vang' ? '255,215,0' : auction.seller.vipTier === 'bac' ? '192,192,192' : '205,127,50'}, 0.15)`,
                      color: auction.seller.vipTier === 'vang' ? '#ffd700' : auction.seller.vipTier === 'bac' ? '#c0c0c0' : '#cd7f32',
                    }}
                  >
                    {getVipLabel(auction.seller.vipTier)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
