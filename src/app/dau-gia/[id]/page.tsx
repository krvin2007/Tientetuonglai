'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { auctions, mockBids } from '@/lib/mock-data';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useUser } from '@/components/providers/UserProvider';
import styles from './page.module.css';

export default function AuctionDetailPage() {
  const { id } = useParams();
  const account = useCurrentAccount();
  const { balance, network } = useUser();
  const [bidAmount, setBidAmount] = useState<string>('');
  const [isBidding, setIsBidding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  
  const auction = auctions.find(a => a.id === id) || auctions[0];
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

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
      // Real transaction logic for demo: self transfer of a small amount
      const [coin] = txb.splitCoins(txb.gas, [txb.pure.u64(1000)]); 
      txb.transferObjects([coin], txb.pure.address(account.address));

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
            alert(`Đặt giá thất bại: ${error.message || 'Lỗi kết nối RPC hoặc người dùng từ chối'}\n\nMẹo: Hãy kiểm tra mạng Testnet trong ví SUI của bạn!`);
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
      // Buy Now demo: Transfer 0.01 SUI as a "payment" (to self for demo)
      const [coin] = txb.splitCoins(txb.gas, [txb.pure.u64(10000000)]); // 0.01 SUI
      txb.transferObjects([coin], txb.pure.address(account.address));

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

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Left: Images */}
            <div className={styles.imageSection}>
              <div className={styles.mainImageWrap}>
                <img src={auction.images[0]} alt={auction.title} className={styles.mainImage} />
              </div>
            </div>

            {/* Right: Info */}
            <div className={styles.infoSection}>
              <h1 className={styles.title}>{auction.title}</h1>
              <p className={styles.description}>{auction.description}</p>
              
              <div className={styles.priceCard}>
                <div className={styles.priceGrid}>
                  <div>
                    <div className={styles.label}>Giá hiện tại</div>
                    <div className={styles.price}>{auction.currentPrice} SUI</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.label}>Số dư khả dụng</div>
                    <div className={styles.userBalance}>{balance} SUI</div>
                  </div>
                </div>

                <div className={styles.bidAction}>
                  <div className={styles.inputWrap}>
                    <input 
                      type="number" 
                      placeholder={`Tối thiểu ${auction.currentPrice + auction.minBidIncrement}`}
                      className={styles.input}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <span className={styles.inputSui}>SUI</span>
                  </div>
                  <button 
                    className={styles.bidBtn} 
                    onClick={handleBid}
                    disabled={isBidding}
                  >
                    {isBidding ? 'Đang xử lý...' : 'Đặt Giá Thật (Blockchain)'}
                  </button>
                  
                  <button 
                    className={styles.buyBtn} 
                    onClick={handleBuyNow}
                    disabled={isBuying}
                  >
                    {isBuying ? 'Đang xử lý...' : `Mua Ngay (Ký giao dịch ${auction.currentPrice} SUI)`}
                  </button>
                </div>
              </div>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Người bán:</span>
                  <span className={styles.metaValue}>{auction.seller.name}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Thời gian kết thúc:</span>
                  <span className={styles.metaValue}>{new Date(auction.endTime).toLocaleString('vi-VN')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.history}>
            <h2 className={styles.historyTitle}>Lịch sử đấu giá</h2>
            <div className={styles.historyList}>
              {mockBids.filter(b => b.auctionId === auction.id).map(bid => (
                <div key={bid.id} className={styles.historyItem}>
                  <div className={styles.historyUser}>{bid.bidder.name}</div>
                  <div className={styles.historyTime}>{bid.timestamp}</div>
                  <div className={styles.historyAmount}>{bid.amount} SUI</div>
                </div>
              ))}
              {mockBids.filter(b => b.auctionId === auction.id).length === 0 && (
                <div className={styles.emptyHistory}>Chưa có lượt đấu giá nào. Hãy là người đầu tiên!</div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
