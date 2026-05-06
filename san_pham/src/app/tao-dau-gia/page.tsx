'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, Gavel, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { categories } from '@/lib/mock-data';
import styles from './page.module.css';

export default function CreateAuctionPage() {
  const [duration, setDuration] = useState('3d');

  const durations = [
    { id: '1d', label: '1 Ngày' },
    { id: '3d', label: '3 Ngày' },
    { id: '7d', label: '7 Ngày' },
    { id: '14d', label: '14 Ngày' },
  ];

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>
              Tạo <span className="gradient-text">Phiên Đấu Giá</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Đăng tài sản của bạn lên nền tảng đấu giá blockchain SUI
            </p>
          </div>

          <div className={styles.formCard}>
            {/* Image Upload */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                Hình ảnh sản phẩm
              </label>
              <div className={styles.uploadArea}>
                <div className={styles.uploadIcon}>📸</div>
                <p className={styles.uploadText}>Kéo thả hoặc nhấn để tải ảnh lên</p>
                <p className={styles.uploadHint}>PNG, JPG, GIF - Tối đa 10MB mỗi ảnh</p>
              </div>
            </div>

            {/* Title */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                Tên sản phẩm
              </label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="VD: Máy Pha Cà Phê DeLonghi Magnifica"
              />
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                Mô tả chi tiết
              </label>
              <textarea
                className={`${styles.formInput} ${styles.formTextarea}`}
                placeholder="Mô tả tình trạng, xuất xứ, đặc điểm nổi bật của sản phẩm..."
              />
            </div>

            {/* Category */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                Danh mục
              </label>
              <select className={styles.formSelect}>
                <option value="">Chọn danh mục</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <hr className={styles.formDivider} />

            {/* Price Row */}
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                  Giá khởi điểm
                </label>
                <div className={styles.formInputGroup}>
                  <input
                    type="number"
                    className={styles.formInput}
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                  <span className={styles.formInputSuffix}>SUI</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                  Bước giá tối thiểu
                </label>
                <div className={styles.formInputGroup}>
                  <input
                    type="number"
                    className={styles.formInput}
                    placeholder="0.5"
                    min="0"
                    step="0.1"
                  />
                  <span className={styles.formInputSuffix}>SUI</span>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                Thời gian đấu giá
              </label>
              <div className={styles.durationGrid}>
                {durations.map(d => (
                  <button
                    key={d.id}
                    className={`${styles.durationOption} ${duration === d.id ? styles.durationOptionActive : ''}`}
                    onClick={() => setDuration(d.id)}
                    type="button"
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <p className={styles.formHint}>
                Phiên đấu giá sẽ tự động kết thúc sau thời gian đã chọn
              </p>
            </div>

            {/* Fee Notice */}
            <div className={styles.feeNotice}>
              <span className={styles.feeNoticeIcon}>💡</span>
              <div>
                <strong>Phí giao dịch:</strong> 2.5% giá trị cuối cùng. 
                VIP Đồng giảm 5%, VIP Bạc giảm 10%, VIP Vàng giảm 20%. 
                Phí gas SUI được tính riêng cho mỗi giao dịch trên blockchain.
              </div>
            </div>

            {/* Actions */}
            <div className={styles.formActions}>
              <button className={styles.submitBtn} type="button">
                <Gavel size={18} />
                Tạo Phiên Đấu Giá
              </button>
              <Link href="/" className={styles.cancelBtn}>
                Hủy
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
