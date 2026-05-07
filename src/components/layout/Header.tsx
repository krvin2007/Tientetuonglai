'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { ConnectButton } from '@mysten/dapp-kit';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Trang Chủ' },
    { href: '/dau-gia', label: 'Đấu Giá' },
    { href: '/vip', label: 'VIP' },
    { href: '/tao-dau-gia', label: 'Tạo Đấu Giá' },
    { href: '/tai-khoan', label: 'Tài Khoản' },
  ];

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>⚡</div>
            <div>
              <span className={styles.logoText}>SUI Auction</span>
              <span className={styles.logoSub}>Blockchain Marketplace</span>
            </div>
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.navLink}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.searchBtn} aria-label="Tìm kiếm">
              <Search size={18} />
            </button>

            <div className={styles.walletBtnWrap}>
              <ConnectButton connectText="Kết Nối Ví" />
            </div>

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${isMobileOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={() => setIsMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className={styles.mobileWalletWrap}>
          <ConnectButton connectText="Kết Nối Ví SUI" />
        </div>
      </div>
    </>
  );
}
