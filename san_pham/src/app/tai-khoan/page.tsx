'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getVipLabel } from '@/lib/utils';
import styles from './page.module.css';

const mockProfile = {
  name: 'Nguyễn Văn An',
  vipTier: 'vang' as const,
  walletAddress: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
  balance: 1250.75,
  stats: {
    totalBids: 89,
    wonAuctions: 12,
    activeBids: 5,
    totalSpent: 15420,
  },
};

const mockActivity = [
  { id: '1', type: 'bid', title: 'Đấu giá Máy Pha Cà Phê DeLonghi', amount: 45.5, time: '5 phút trước', auction: 'a1' },
  { id: '2', type: 'win', title: 'Thắng đấu giá Nike Air Jordan 1 OG', amount: 280, time: '2 giờ trước', auction: 'a5' },
  { id: '3', type: 'bid', title: 'Đấu giá Skin Dragon Lore AWP', amount: 1250, time: '3 giờ trước', auction: 'a2' },
  { id: '4', type: 'sell', title: 'Bán iPhone 15 Pro Max 512GB', amount: 650, time: '1 ngày trước', auction: 'a8' },
  { id: '5', type: 'bid', title: 'Đấu giá Đồng Hồ Rolex Submariner', amount: 5100, time: '1 ngày trước', auction: 'a7' },
  { id: '6', type: 'win', title: 'Thắng đấu giá Bộ LEGO Star Wars', amount: 120, time: '3 ngày trước', auction: 'a10' },
  { id: '7', type: 'sell', title: 'Bán Laptop MacBook Pro M3', amount: 890, time: '5 ngày trước', auction: 'a12' },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? mockActivity
    : mockActivity.filter(a => a.type === activeTab);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'bid': return '🔨';
      case 'win': return '🏆';
      case 'sell': return '💰';
      default: return '📋';
    }
  };

  const getActivityStyle = (type: string) => {
    switch (type) {
      case 'bid': return styles.activityBid;
      case 'win': return styles.activityWin;
      case 'sell': return styles.activitySell;
      default: return '';
    }
  };

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.profileSection}>
            <div className={styles.profileCard}>
              <div className={styles.profileAvatar}>
                {mockProfile.name.charAt(0)}
              </div>
              <h1 className={styles.profileName}>{mockProfile.name}</h1>
              <span
                className={styles.profileVip}
                style={{
                  background: 'rgba(255, 215, 0, 0.15)',
                  color: '#ffd700',
                }}
              >
                {getVipLabel(mockProfile.vipTier)}
              </span>

              <div className={styles.profileWallet}>
                <div className={styles.profileWalletLabel}>Địa chỉ ví SUI</div>
                <div className={styles.profileWalletAddress}>
                  {mockProfile.walletAddress.slice(0, 10)}...{mockProfile.walletAddress.slice(-8)}
                </div>
              </div>

              <div className={styles.profileBalance}>
                <div className={styles.profileBalanceLabel}>Số dư</div>
                <div className={styles.profileBalanceValue}>
                  {mockProfile.balance.toLocaleString()}
                  <span className={styles.profileBalanceSUI}> SUI</span>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>🔨</div>
                  <div className={styles.statValue} style={{ color: 'var(--accent-blue-light)' }}>
                    {mockProfile.stats.totalBids}
                  </div>
                  <div className={styles.statLabel}>Tổng lượt đấu giá</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>🏆</div>
                  <div className={styles.statValue} style={{ color: 'var(--accent-green)' }}>
                    {mockProfile.stats.wonAuctions}
                  </div>
                  <div className={styles.statLabel}>Đã thắng</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>⚡</div>
                  <div className={styles.statValue} style={{ color: 'var(--accent-gold)' }}>
                    {mockProfile.stats.activeBids}
                  </div>
                  <div className={styles.statLabel}>Đang tham gia</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>💎</div>
                  <div className={styles.statValue} style={{ color: 'var(--accent-purple)' }}>
                    {mockProfile.stats.totalSpent.toLocaleString()}
                  </div>
                  <div className={styles.statLabel}>Tổng SUI giao dịch</div>
                </div>
              </div>

              <div className={styles.tabs}>
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'bid', label: '🔨 Đấu giá' },
                  { id: 'win', label: '🏆 Đã thắng' },
                  { id: 'sell', label: '💰 Đã bán' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className={styles.activityCard}>
                {filtered.length > 0 ? filtered.map(item => (
                  <div key={item.id} className={styles.activityItem}>
                    <div className={`${styles.activityIcon} ${getActivityStyle(item.type)}`}>
                      {getActivityIcon(item.type)}
                    </div>
                    <div className={styles.activityInfo}>
                      <div className={styles.activityTitle}>{item.title}</div>
                      <div className={styles.activityMeta}>{item.time}</div>
                    </div>
                    <div className={`${styles.activityAmount} ${
                      item.type === 'sell' || item.type === 'win'
                        ? styles.activityAmountPositive
                        : styles.activityAmountNegative
                    }`}>
                      {item.type === 'sell' ? '+' : item.type === 'win' ? '' : '-'}
                      {item.amount.toLocaleString()} SUI
                    </div>
                  </div>
                )) : (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📋</div>
                    <p>Chưa có hoạt động nào</p>
                  </div>
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
