'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { ConnectButton } from '@mysten/dapp-kit';
import { useUser } from '@/components/providers/UserProvider';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { vipTier, network, changeNetwork } = useUser();

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
            <div className={styles.logoIcon}>💰</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={styles.logoText}>Tientetuonglai</span>
                {vipTier !== 'none' ? (
                  <span 
                    style={{ 
                      fontSize: '10px', 
                      background: vipTier === 'vang' ? 'var(--gradient-gold)' : vipTier === 'bac' ? '#c0c0c0' : '#cd7f32', 
                      padding: '2px 8px', 
                      borderRadius: '10px', 
                      color: vipTier === 'vang' ? 'black' : 'white', 
                      fontWeight: 'bold',
                      boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    VIP {vipTier.toUpperCase()}
                  </span>
                ) : (
                  <span style={{ fontSize: '10px', background: 'var(--accent-gold)', padding: '2px 6px', borderRadius: '4px', color: 'black', fontWeight: 'bold' }}>PRO</span>
                )}
              </div>
              <span className={styles.logoSub}>SUI Auction Platform v1.1.8-FINAL</span>
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
            <div className={styles.networkSwitcher}>
              <select 
                value={network} 
                onChange={(e) => changeNetwork(e.target.value)}
                className={styles.networkSelect}
              >
                <option value="mainnet">Mainnet</option>
                <option value="testnet">Testnet</option>
                <option value="devnet">Devnet</option>
              </select>
            </div>

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
