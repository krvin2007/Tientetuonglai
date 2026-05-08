'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getVipLabel } from '@/lib/utils';
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { ConnectButton } from '@mysten/dapp-kit';
import styles from './page.module.css';

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
  const account = useCurrentAccount();
  const { data: balanceData } = useSuiClientQuery(
    'getBalance',
    { owner: account?.address || '' },
    { enabled: !!account?.address }
  );

  const [activeTab, setActiveTab] = useState('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const balance = balanceData ? (Number(balanceData.totalBalance) / 1_000_000_000).toFixed(2) : '0.00';

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

  if (!isMounted) return null;

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.inner}>
          {!account ? (
            <div className={styles.notConnected}>
              <div className={styles.notConnectedIcon}>🔐</div>
              <h1 className={styles.notConnectedTitle}>Kết nối ví của bạn</h1>
              <p className={styles.notConnectedDesc}>
                Vui lòng kết nối ví SUI của bạn để xem thông tin tài khoản, số dư và lịch sử giao dịch thật.
              </p>
              <div className={styles.connectBtnWrap}>
                <ConnectButton connectText="Kết nối Ví SUI ngay" />
              </div>
            </div>
          ) : (
            <div className={styles.profileSection}>
              <div className={styles.profileCard}>
                <div className={styles.profileAvatar}>
                  {account.address.charAt(2).toUpperCase()}
                </div>
                <h1 className={styles.profileName}>Tài khoản SUI</h1>
                <span
                  className={styles.profileVip}
                  style={{
                    background: 'rgba(255, 215, 0, 0.15)',
                    color: '#ffd700',
                  }}
                >
                  {getVipLabel('none')}
                </span>

                <div className={styles.profileWallet}>
                  <div className={styles.profileWalletLabel}>Địa chỉ ví SUI</div>
                  <div className={styles.profileWalletAddress}>
                    {account.address.slice(0, 10)}...{account.address.slice(-8)}
                  </div>
                </div>

                <div className={styles.profileBalance}>
                  <div className={styles.profileBalanceLabel}>Số dư thực tế</div>
                  <div className={styles.profileBalanceValue}>
                    {balance}
                    <span className={styles.profileBalanceSUI}> SUI</span>
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>🔨</div>
                    <div className={styles.statValue} style={{ color: 'var(--accent-blue-light)' }}>
                      {mockActivity.filter(a => a.type === 'bid').length}
                    </div>
                    <div className={styles.statLabel}>Lượt đấu giá (Demo)</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>🏆</div>
                    <div className={styles.statValue} style={{ color: 'var(--accent-green)' }}>
                      {mockActivity.filter(a => a.type === 'win').length}
                    </div>
                    <div className={styles.statLabel}>Đã thắng (Demo)</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>⚡</div>
                    <div className={styles.statValue} style={{ color: 'var(--accent-gold)' }}>
                      0
                    </div>
                    <div className={styles.statLabel}>Đang tham gia</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon}>💎</div>
                    <div className={styles.statValue} style={{ color: 'var(--accent-purple)' }}>
                      {balance}
                    </div>
                    <div className={styles.statLabel}>SUI khả dụng</div>
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
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
