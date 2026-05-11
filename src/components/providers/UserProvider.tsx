'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';

type VipTier = 'none' | 'dong' | 'bac' | 'vang';

interface UserContextType {
  vipTier: VipTier;
  upgradeVip: (tier: VipTier) => void;
  balance: string;
  isLoadingBalance: boolean;
  network: string;
  changeNetwork: (network: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const account = useCurrentAccount();
  const [vipTier, setVipTier] = useState<VipTier>('none');
  const [network, setNetwork] = useState<string>('mainnet');

  const { data: balanceData, isLoading: isLoadingBalance, error: balanceError, refetch } = useSuiClientQuery(
    'getBalance',
    { owner: account?.address || '' },
    { 
      enabled: !!account?.address,
      refetchInterval: 10000 // Refetch every 10s
    }
  );

  // Persistence for VIP tier
  useEffect(() => {
    const savedVip = localStorage.getItem('userVipTier') as VipTier;
    if (savedVip) {
      setVipTier(savedVip);
    }
    
    const savedNetwork = localStorage.getItem('suiNetwork');
    if (savedNetwork) {
      setNetwork(savedNetwork);
    }
  }, []);

  const upgradeVip = (tier: VipTier) => {
    setVipTier(tier);
    localStorage.setItem('userVipTier', tier);
  };

  const changeNetwork = (newNetwork: string) => {
    setNetwork(newNetwork);
    localStorage.setItem('suiNetwork', newNetwork);
    // The provider in SuiWalletProvider will handle the actual client switch
    window.location.reload(); // Hard reload to ensure all providers update
  };

  const balance = (balanceData && balanceData.totalBalance) 
    ? (Number(balanceData.totalBalance) / 1_000_000_000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 9 }) 
    : '0.00';

  return (
    <UserContext.Provider value={{ 
      vipTier, 
      upgradeVip, 
      balance, 
      isLoadingBalance: isLoadingBalance && !!account,
      network,
      changeNetwork
    }}>
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
