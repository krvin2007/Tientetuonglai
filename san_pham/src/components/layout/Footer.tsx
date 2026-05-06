import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}>⚡</div>
            <span className={styles.footerLogoText}>SUI Auction</span>
          </div>
          <p className={styles.footerDesc}>
            Nền tảng đấu giá trực tuyến đa dạng tài sản trên blockchain SUI.
            Giao dịch minh bạch, an toàn và phi tập trung.
          </p>
          <div className={styles.footerSocial}>
            <a href="#" className={styles.socialLink} aria-label="Twitter">𝕏</a>
            <a href="#" className={styles.socialLink} aria-label="Discord">💬</a>
            <a href="#" className={styles.socialLink} aria-label="Telegram">✈️</a>
            <a href="#" className={styles.socialLink} aria-label="GitHub">⌨️</a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h4>Đấu Giá</h4>
          <Link href="/dau-gia" className={styles.footerLink}>Tất Cả Đấu Giá</Link>
          <Link href="/dau-gia?cat=gia-dung" className={styles.footerLink}>Đồ Gia Dụng</Link>
          <Link href="/dau-gia?cat=game" className={styles.footerLink}>Vật Phẩm Game</Link>
          <Link href="/dau-gia?cat=thoi-trang" className={styles.footerLink}>Thời Trang</Link>
          <Link href="/dau-gia?cat=do-co" className={styles.footerLink}>Đồ Cổ</Link>
        </div>

        <div className={styles.footerSection}>
          <h4>Tài Khoản</h4>
          <Link href="/tai-khoan" className={styles.footerLink}>Hồ Sơ</Link>
          <Link href="/tai-khoan" className={styles.footerLink}>Lịch Sử Giao Dịch</Link>
          <Link href="/vip" className={styles.footerLink}>Nâng Cấp VIP</Link>
          <Link href="/tao-dau-gia" className={styles.footerLink}>Tạo Đấu Giá</Link>
        </div>

        <div className={styles.footerSection}>
          <h4>Hỗ Trợ</h4>
          <Link href="#" className={styles.footerLink}>Trung Tâm Trợ Giúp</Link>
          <Link href="#" className={styles.footerLink}>Hướng Dẫn Mới</Link>
          <Link href="#" className={styles.footerLink}>Điều Khoản Dịch Vụ</Link>
          <Link href="#" className={styles.footerLink}>Chính Sách Bảo Mật</Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span className={styles.footerCopy}>
          © 2025 SUI Auction. All rights reserved.
        </span>
        <div className={styles.footerPowered}>
          Powered by
          <span className={styles.suiBadge}>SUI Blockchain</span>
        </div>
      </div>
    </footer>
  );
}
