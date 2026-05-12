'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Gavel, ShieldCheck, User, History, Zap, Crown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { auctions, mockBids } from '@/lib/mock-data';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useUser } from '@/components/providers/UserProvider';
import styles from './page.module.css';

const VAULT_ADDRESS = '0x8979147e4c9f1390494df9f87f54c25a07c30a4306e987c6f0592945d8b7b252';

export default function AuctionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const account = useCurrentAccount();
  const { balance, network, vipTier } = useUser();
  const [bidAmount, setBidAmount] = useState<string>('');
  const [isBidding, setIsBidding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  
  const auction = auctions.find(a => a.id === id);
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  if (!auction) {
    return (
      <>
        <Header />
        <div className={styles.notFound}>
          <div className={styles.notFoundIcon}>🔍</div>
          <h1 className={styles.notFoundTitle}>Không tìm thấy sản phẩm</h1>
          <p className={styles.notFoundDesc}>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link href="/dau-gia" className={styles.notFoundBtn}>
            <ArrowLeft size={18} /> Quay lại danh sách
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const handleBid = async () => {
    if (!account) {
      alert('Vui lòng kết nối ví SUI!');
      return;
    }

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= auction.currentPrice) {
      alert(`Vui lòng nhập số tiền lớn hơn giá hiện tại (${auction.currentPrice} SUI)`);
      return;
    }

    const cleanBalance = balance.replace(/,/g, '');
    if (parseFloat(cleanBalance) < amount) {
      alert('Số dư SUI không đủ để đặt giá!');
      return;
    }

    setIsBidding(true);
    try {
      const txb = new Transaction();
      // Calculate MIST (1 SUI = 10^9 MIST)
      const mistAmount = BigInt(Math.floor(amount * 1_000_000_000));
      
      const [coin] = txb.splitCoins(txb.gas, [txb.pure.u64(mistAmount)]); 
      txb.transferObjects([coin], txb.pure.address(VAULT_ADDRESS));

      signAndExecuteTransaction(
        {
          transaction: txb as any,
          chain: `sui:${network}`,
        },
        {
          onSuccess: (result) => {
            console.log('Bid success', result);
            alert('Đặt giá thành công! Giao dịch đã được ghi nhận trên SUI Blockchain.');
            setIsBidding(false);
          },
          onError: (error: any) => {
            console.error('Bid error', error);
            alert(`Đặt giá thất bại: ${error.message || 'Lỗi kết nối RPC hoặc người dùng từ chối'}`);
            setIsBidding(false);
          },
        }
      );
    } catch (err: any) {
      alert(`Lỗi: ${err.message}`);
      setIsBidding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!account) {
      alert('Vui lòng kết nối ví SUI!');
      return;
    }

    const cleanBalance = balance.replace(/,/g, '');
    if (parseFloat(cleanBalance) < auction.currentPrice) {
      alert('Số dư SUI không đủ để mua ngay!');
      return;
    }

    setIsBuying(true);
    try {
      const txb = new Transaction();
      const mistAmount = BigInt(Math.floor(auction.currentPrice * 1_000_000_000));
      
      const [coin] = txb.splitCoins(txb.gas, [txb.pure.u64(mistAmount)]);
      txb.transferObjects([coin], txb.pure.address(VAULT_ADDRESS));

      signAndExecuteTransaction(
        {
          transaction: txb as any,
          chain: `sui:${network}`,
        },
        {
          onSuccess: (result) => {
            console.log('Buy success', result);
            alert('Mua ngay thành công! Sản phẩm đã thuộc về bạn trên Blockchain.');
            setIsBuying(false);
          },
          onError: (error: any) => {
            console.error('Buy error', error);
            alert(`Mua ngay thất bại: ${error.message || 'Lỗi kết nối RPC'}`);
            setIsBuying(false);
          },
        }
      );
    } catch (err: any) {
      alert(`Lỗi: ${err.message}`);
      setIsBuying(false);
    }
  };

  const currentAuctionBids = mockBids.filter(b => b.auctionId === auction.id).sort((a, b) => b.amount - a.amount);

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.inner}>
          <Link href="/dau-gia" className={styles.backLink}>
            <ArrowLeft size={16} /> Quay lại danh sách
          </Link>

          <div className={styles.detailGrid}>
            {/* Left: Images & Main Info */}
            <div className={styles.leftCol}>
              <div className={styles.imageMain}>
                <img src={auction.images[0]} alt={auction.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className={styles.imageBadges}>
                  {auction.hotDeal && <span className={`${styles.badge} ${styles.badgeHot}`}>HOT DEAL</span>}
                  {auction.featured && <span className={`${styles.badge} ${styles.badgeFeatured}`}>TIÊU BIỂU</span>}
                  <span className={`${styles.badge} ${styles.badgeCategory}`}>SUI Blockchain</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h1 className={styles.title}>{auction.title}</h1>
                <p className={styles.desc}>{auction.description}</p>
                
                <div className={styles.metaGrid}>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Mã phiên</div>
                    <div className={styles.metaValue}>#{auction.id.toUpperCase()}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Mạng lưới</div>
                    <div className={styles.metaValue}>{network.toUpperCase()}</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Giá khởi điểm</div>
                    <div className={styles.metaValue}>{auction.startPrice} SUI</div>
                  </div>
                  <div className={styles.metaItem}>
                    <div className={styles.metaLabel}>Bước giá tối thiểu</div>
                    <div className={styles.metaValue}>+{auction.minBidIncrement} SUI</div>
                  </div>
                </div>
              </div>

              <div className={styles.sellerCard}>
                <div className={styles.sellerAvatar}>
                  {auction.seller.name.charAt(0)}
                </div>
                <div className={styles.sellerInfo}>
                  <div className={styles.sellerName}>{auction.seller.name}</div>
                  <div className={styles.sellerMeta}>
                    <span>⭐ {auction.seller.rating}</span>
                    <span>• {auction.seller.totalAuctions} phiên đấu</span>
                  </div>
                </div>
                <div className={`${styles.sellerVip} vip-${auction.seller.vipTier}`}>
                  {auction.seller.vipTier.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Right: Bid Panel */}
            <div className={styles.rightCol}>
              <div className={styles.bidCard}>
                <div className={styles.bidTimerLabel}>
                  <span className={styles.liveIndicator}></span>
                  PHIÊN ĐANG DIỄN RA
                </div>
                
                <div className={styles.bidTimerWrap}>
                  <Clock size={20} style={{ marginRight: '8px', color: 'var(--accent-blue-light)' }} />
                  <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>
                    {new Date(auction.endTime).toLocaleDateString('vi-VN')} {new Date(auction.endTime).toLocaleTimeString('vi-VN')}
                  </span>
                </div>

                <div className={styles.currentPriceWrap}>
                  <div className={styles.currentPriceLabel}>Giá hiện tại</div>
                  <div className={styles.currentPrice}>
                    {auction.currentPrice} <span className={styles.currentPriceSUI}>SUI</span>
                  </div>
                </div>

                <div className={styles.bidStats}>
                  <div className={styles.bidStatItem}>
                    <div className={styles.bidStatValue}>{auction.bidCount}</div>
                    <div className={styles.bidStatLabel}>Lượt đặt</div>
                  </div>
                  <div className={styles.bidStatItem}>
                    <div className={styles.bidStatValue}>100%</div>
                    <div className={styles.bidStatLabel}>Tin cậy</div>
                  </div>
                </div>

                <div className={styles.bidInputGroup}>
                  <div className={styles.bidInputLabel}>
                    Số tiền đấu giá
                    {vipTier !== 'none' && <span className={styles.vipBenefitTag}>VIP ƯU TIÊN</span>}
                  </div>
                  <div className={styles.bidInputWrap}>
                    <input 
                      type="number" 
                      className={styles.bidInput}
                      placeholder={`>${auction.currentPrice + auction.minBidIncrement}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <div className={styles.bidCurrency}>SUI</div>
                  </div>
                  <div className={styles.bidMinNote}>
                    Số dư khả dụng: <strong>{balance} SUI</strong>
                  </div>
                </div>

                <button 
                  className={styles.bidBtn}
                  onClick={handleBid}
                  disabled={isBidding}
                >
                  <Gavel size={20} />
                  {isBidding ? 'ĐANG XỬ LÝ...' : 'ĐẶT GIÁ BLOCKCHAIN'}
                </button>

                <button 
                  className={styles.buyBtn}
                  onClick={handleBuyNow}
                  disabled={isBuying}
                >
                  <Zap size={20} />
                  {isBuying ? 'ĐANG XỬ LÝ...' : `MUA NGAY ${auction.currentPrice} SUI`}
                </button>

                <div className={styles.bidNote}>
                  <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  Giao dịch an toàn và bảo mật trên SUI Network
                </div>
              </div>

              <div className={styles.historyCard}>
                <h2 className={styles.historyTitle}>
                  <History size={18} /> Lịch sử đấu giá
                </h2>
                <div className={styles.historyList}>
                  {currentAuctionBids.map((bid, index) => (
                    <div key={bid.id} className={styles.historyItem}>
                      <div className={`${styles.historyRank} ${index === 0 ? styles.historyRank1 : index === 1 ? styles.historyRank2 : index === 2 ? styles.historyRank3 : styles.historyRankDefault}`}>
                        {index + 1}
                      </div>
                      <div className={styles.historyBidder}>
                        <div className={styles.historyBidderName}>{bid.bidder.name}</div>
                        <div className={styles.historyTime}>{bid.timestamp}</div>
                      </div>
                      <div className={styles.historyAmount}>{bid.amount} SUI</div>
                    </div>
                  ))}
                  {currentAuctionBids.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                      Chưa có lượt đặt giá nào.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
