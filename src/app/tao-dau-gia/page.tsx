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
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    startPrice: '',
    minIncrement: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const durations = [
    { id: '1d', label: '1 Ngày' },
    { id: '3d', label: '3 Ngày' },
    { id: '7d', label: '7 Ngày' },
    { id: '14d', label: '14 Ngày' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.startPrice || !formData.categoryId) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);

    // Simulate blockchain transaction
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Tạo phiên đấu giá thành công! Sản phẩm của bạn đã được đưa lên SUI Blockchain và đang chờ người tham gia.');
      window.location.href = '/dau-gia';
    }, 2000);
  };

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
                name="title"
                className={styles.formInput}
                placeholder="VD: Máy Pha Cà Phê DeLonghi Magnifica"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                Mô tả chi tiết
              </label>
              <textarea
                name="description"
                className={`${styles.formInput} ${styles.formTextarea}`}
                placeholder="Mô tả tình trạng, xuất xứ, đặc điểm nổi bật của sản phẩm..."
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            {/* Category */}
            <div className={styles.formGroup}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>
                Danh mục
              </label>
              <select 
                name="categoryId"
                className={styles.formSelect}
                value={formData.categoryId}
                onChange={handleInputChange}
              >
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
                    name="startPrice"
                    className={styles.formInput}
                    placeholder="0"
                    min="0"
                    step="0.1"
                    value={formData.startPrice}
                    onChange={handleInputChange}
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
                    name="minIncrement"
                    className={styles.formInput}
                    placeholder="0.5"
                    min="0"
                    step="0.1"
                    value={formData.minIncrement}
                    onChange={handleInputChange}
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
              <button 
                className={`${styles.submitBtn} ${isSubmitting ? styles.submitBtnLoading : ''}`} 
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <Gavel size={18} />
                {isSubmitting ? 'Đang tạo...' : 'Tạo Phiên Đấu Giá'}
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
