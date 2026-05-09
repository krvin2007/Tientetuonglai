'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';

type VipTier = 'none' | 'dong' | 'bac' | 'vang';

interface UserContextType {
  vipTier: VipTier;
  upgradeVip: (tier: VipTier) => void;
  balance: string;
  isLoadingBalance: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const account = useCurrentAccount();
  const [vipTier, setVipTier] = useState<VipTier>('none');

  const { data: balanceData, isLoading: isLoadingBalance } = useSuiClientQuery(
    'getBalance',
    { owner: account?.address || '' },
    { enabled: !!account?.address }
  );

  // Persistence for VIP tier in local storage (mock for demo)
  useEffect(() => {
    const savedVip = localStorage.getItem('userVipTier') as VipTier;
    if (savedVip) {
      setVipTier(savedVip);
    }
  }, []);

  const upgradeVip = (tier: VipTier) => {
    setVipTier(tier);
    localStorage.setItem('userVipTier', tier);
  };

  const balance = balanceData ? (Number(balanceData.totalBalance) / 1_000_000_000).toFixed(2) : '0.00';

  return (
    <UserContext.Provider value={{ vipTier, upgradeVip, balance, isLoadingBalance }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
