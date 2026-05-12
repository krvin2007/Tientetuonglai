'use client';

import { useState } from 'react';
import { Check, X, Zap, Crown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { vipTiers } from '@/lib/mock-data';
import { useUser } from '@/components/providers/UserProvider';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import styles from './page.module.css';

const VAULT_ADDRESS = '0x8979147e4c9f1390494df9f87f54c25a07c30a4306e987c6f0592945d8b7b252';

export default function VipPage() {
  const [isYearly, setIsYearly] = useState(false);
  const { vipTier, upgradeVip, balance, network } = useUser();
  const account = useCurrentAccount();
  const [isUpgrading, setIsUpgrading] = useState<string | null>(null);

  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const handleUpgrade = (tierId: 'dong' | 'bac' | 'vang', price: number) => {
    console.log(`Starting upgrade to ${tierId} for ${price} SUI`);
    
    if (!account) {
      alert('Vui lòng kết nối ví SUI để nâng cấp VIP!');
      return;
    }

    // Parse balance safely
    const cleanBalance = balance.replace(/,/g, '');
    const userBalance = Number(cleanBalance);
    
    console.log(`Current Balance: ${userBalance}, Price: ${price}`);

    if (userBalance < price) {
      alert(`Số dư không đủ! Bạn cần ${price} SUI để nâng cấp nhưng ví chỉ có ${balance} SUI.\n\nLưu ý: Hãy kiểm tra xem bạn đã chọn đúng mạng (Mainnet/Testnet) trong ví chưa nhé!`);
      return;
    }

    if (vipTier === tierId) {
      alert(`Bạn hiện đã là VIP ${tierId.toUpperCase()}!`);
      return;
    }

    setIsUpgrading(tierId);
    
    try {
      const txb = new Transaction();
      
      // Calculate MIST (1 SUI = 10^9 MIST)
      const mistAmount = BigInt(Math.floor(price * 1_000_000_000));
      
      const [coin] = txb.splitCoins(txb.gas, [txb.pure.u64(mistAmount)]);
      txb.transferObjects([coin], txb.pure.address(VAULT_ADDRESS));
      
      console.log('Executing transaction for ' + price + ' SUI...');

      signAndExecuteTransaction(
        {
          transaction: txb as any,
          chain: `sui:${network}`,
        },
        {
          onSuccess: (result) => {
            console.log('Transaction successful', result);
            upgradeVip(tierId);
            setIsUpgrading(null);
            alert(`Nâng cấp VIP ${tierId.toUpperCase()} thành công! Giao dịch đã được xác nhận trên SUI Blockchain.`);
          },
          onError: (error: any) => {
            console.error('Transaction failed', error);
            setIsUpgrading(null);
            alert(`Giao dịch thất bại: ${error.message || 'Người dùng từ chối giao dịch hoặc lỗi mạng'}`);
          },
        }
      );
    } catch (err: any) {
      console.error('Catch error:', err);
      setIsUpgrading(null);
      alert(`Có lỗi xảy ra khi tạo giao dịch: ${err.message || 'Lỗi không xác định'}`);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Nâng Cấp <span className="gradient-text-gold">VIP</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Mở khóa sức mạnh đấu giá tối đa. Tăng giới hạn, giảm phí giao dịch
            và nhận các đặc quyền chỉ dành riêng cho VIP.
          </p>
        </div>

        <div className={styles.tierToggle}>
          <div className={styles.toggleWrap}>
            <button
              className={`${styles.toggleBtn} ${!isYearly ? styles.toggleBtnActive : ''}`}
              onClick={() => setIsYearly(false)}
            >
              Hàng Tháng
            </button>
            <button
              className={`${styles.toggleBtn} ${isYearly ? styles.toggleBtnActive : ''}`}
              onClick={() => setIsYearly(true)}
            >
              Hàng Năm
              <span className={styles.saveBadge}>Tiết kiệm 17%</span>
            </button>
          </div>
        </div>

        <div className={styles.tiersGrid}>
          {vipTiers.map((tier) => {
            const price = isYearly ? tier.priceYearly : tier.priceMonthly;
            const isGold = tier.id === 'vang';
            const isPopular = tier.id === 'bac';
            const isCurrentTier = vipTier === tier.id;

            return (
              <div
                key={tier.id}
                className={`${styles.tierCard} ${isPopular ? styles.tierPopular : ''} ${isGold ? styles.tierGold : ''} ${isCurrentTier ? styles.tierCurrent : ''}`}
                style={{ '--tier-glow': tier.glowColor } as React.CSSProperties}
              >
                {isPopular && <span className={styles.popularBadge}>Phổ biến nhất</span>}
                {isCurrentTier && <span className={styles.currentBadge}>Gói hiện tại</span>}

                <span className={styles.tierIcon}>{tier.icon}</span>
                <h2 className={styles.tierName} style={{ color: tier.color }}>
                  {tier.name}
                </h2>
                <p className={styles.tierNameVi}>VIP {tier.nameVi}</p>

                <div className={styles.tierPrice}>
                  <span className={styles.tierPriceValue} style={{ color: tier.color }}>
                    {price}
                  </span>
                  <span className={styles.tierPriceSUI}> SUI</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                    Mạng: {network.toUpperCase()}
                  </div>
                  <br />
                  <span className={styles.tierPricePeriod}>
                    /{isYearly ? 'năm' : 'tháng'}
                  </span>
                </div>

                <div className={styles.tierPower}>
                  <Zap size={14} />
                  Công suất x{tier.powerMultiplier}
                </div>

                <div className={styles.tierBenefits}>
                  {tier.benefits.map((benefit, i) => (
                    <div key={i} className={styles.tierBenefit}>
                      <Check size={16} className={styles.tierBenefitIcon} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`${styles.tierBtn} ${isGold ? styles.tierBtnGold : isPopular ? styles.tierBtnPrimary : styles.tierBtnOutline
                    } ${isCurrentTier ? styles.tierBtnDisabled : ''}`}
                  onClick={() => handleUpgrade(tier.id, price)}
                  disabled={isUpgrading !== null || isCurrentTier}
                >
                  <Crown size={16} />
                  {isUpgrading === tier.id ? 'Đang xử lý...' : isCurrentTier ? 'Đang Sử Dụng' : `Đăng Ký ${tier.nameVi}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className={styles.comparison}>
          <div className={styles.comparisonHeader}>
            <h2 className="section-title">
              So Sánh <span className="gradient-text">Chi Tiết</span>
            </h2>
            <p className="section-subtitle">Tìm gói phù hợp với nhu cầu của bạn</p>
          </div>

          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Tính năng</th>
                <th>Miễn phí</th>
                <th>🥉 Đồng</th>
                <th>🥈 Bạc</th>
                <th>🥇 Vàng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Giới hạn đấu giá</td>
                <td>100 SUI</td>
                <td>1,000 SUI</td>
                <td>5,000 SUI</td>
                <td>Không giới hạn</td>
              </tr>
              <tr>
                <td>Số phiên đấu giá/tháng</td>
                <td>3</td>
                <td>10</td>
                <td>30</td>
                <td>Không giới hạn</td>
              </tr>
              <tr>
                <td>Giảm phí giao dịch</td>
                <td>0%</td>
                <td>5%</td>
                <td>10%</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>Công suất đấu giá</td>
                <td>x1</td>
                <td>x2</td>
                <td>x5</td>
                <td>x10</td>
              </tr>
              <tr>
                <td>Badge VIP</td>
                <td><X size={16} className={styles.crossIcon} /></td>
                <td><Check size={16} className={styles.checkIcon} /></td>
                <td><Check size={16} className={styles.checkIcon} /></td>
                <td><Check size={16} className={styles.checkIcon} /></td>
              </tr>
              <tr>
                <td>Hỗ trợ ưu tiên</td>
                <td><X size={16} className={styles.crossIcon} /></td>
                <td>Email</td>
                <td>24/7</td>
                <td>VIP chuyên biệt</td>
              </tr>
              <tr>
                <td>Đấu giá VIP-only</td>
                <td><X size={16} className={styles.crossIcon} /></td>
                <td><X size={16} className={styles.crossIcon} /></td>
                <td><Check size={16} className={styles.checkIcon} /></td>
                <td><Check size={16} className={styles.checkIcon} /></td>
              </tr>
              <tr>
                <td>Thông báo realtime</td>
                <td><X size={16} className={styles.crossIcon} /></td>
                <td><X size={16} className={styles.crossIcon} /></td>
                <td><Check size={16} className={styles.checkIcon} /></td>
                <td><Check size={16} className={styles.checkIcon} /> + SMS</td>
              </tr>
              <tr>
                <td>Ưu tiên hiển thị</td>
                <td><X size={16} className={styles.crossIcon} /></td>
                <td><X size={16} className={styles.crossIcon} /></td>
                <td><X size={16} className={styles.crossIcon} /></td>
                <td><Check size={16} className={styles.checkIcon} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}
