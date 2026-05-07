'use client';

import { useState, useEffect } from 'react';
import { platformStats } from '@/lib/mock-data';
import styles from './LiveStats.module.css';

export default function LiveStats() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className="section-title">
              Nền Tảng <span className="gradient-text">Đấu Giá Hàng Đầu</span>
            </h2>
            <p className="section-subtitle">Minh bạch, an toàn và phi tập trung trên blockchain SUI</p>
          </div>

          <div className={styles.grid}>
            <div className={styles.stat}>
              <span className={styles.statIcon}>📊</span>
              <span className={`${styles.statValue} ${styles.blueValue}`}>
                {isMounted ? platformStats.totalAuctions.toLocaleString() : '...'}
              </span>
              <span className={styles.statLabel}>Tổng phiên đấu giá</span>
            </div>

            <div className={styles.stat}>
              <span className={styles.statIcon}>👥</span>
              <span className={`${styles.statValue} ${styles.purpleValue}`}>
                {isMounted ? platformStats.totalUsers.toLocaleString() : '...'}
              </span>
              <span className={styles.statLabel}>Người dùng</span>
            </div>

            <div className={styles.stat}>
              <span className={styles.statIcon}>⚡</span>
              <span className={`${styles.statValue} ${styles.greenValue}`}>
                {platformStats.activeAuctions}
              </span>
              <span className={styles.statLabel}>Đang diễn ra</span>
            </div>

            <div className={styles.stat}>
              <span className={styles.statIcon}>💎</span>
              <span className={`${styles.statValue} ${styles.goldValue}`}>
                {(platformStats.totalVolumeSUI / 1000000).toFixed(1)}M
              </span>
              <span className={styles.statLabel}>SUI giao dịch</span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div className={styles.suiBadge}>
              ⛓️ Powered by <strong>SUI Blockchain</strong> • Move Smart Contracts
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
