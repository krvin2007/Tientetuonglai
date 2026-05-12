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
  networkName: string;
  changeNetwork: (network: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const account = useCurrentAccount();
  const [vipTier, setVipTier] = useState<VipTier>('none');
  const [network, setNetwork] = useState<string>('mainnet');

  const { data: balanceData, isLoading: isLoadingBalance, error: balanceError } = useSuiClientQuery(
    'getBalance',
    { owner: account?.address || '' },
    { 
      enabled: !!account?.address,
      refetchInterval: 5000 
    }
  );

  // Debugging logs
  useEffect(() => {
    if (account) {
      console.log('Account connected:', account.address);
    }
    if (balanceData) {
      console.log('Balance data received for address ' + (account?.address || 'unknown') + ':', balanceData);
    }
    if (balanceError) {
      console.error('Balance fetch error:', balanceError);
    }
  }, [account, balanceData, balanceError]);

  // Persistence
  useEffect(() => {
    const savedVip = localStorage.getItem('userVipTier') as VipTier;
    if (savedVip && ['none', 'dong', 'bac', 'vang'].includes(savedVip)) {
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
    window.location.reload();
  };

  const formatBalance = (totalBalance?: string) => {
    if (!totalBalance) return '0.00';
    try {
      const mist = BigInt(totalBalance);
      const sui = Number(mist) / 1_000_000_000;
      return sui.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 9 
      });
    } catch (e) {
      return '0.00';
    }
  };

  const balance = formatBalance(balanceData?.totalBalance);
  
  // Human readable network name
  const networkName = network === 'mainnet' ? 'Mainnet' : 
                      network === 'testnet' ? 'Testnet' : 
                      network === 'devnet' ? 'Devnet' : 'Localnet';

  return (
    <UserContext.Provider value={{ 
      vipTier, 
      upgradeVip, 
      balance, 
      isLoadingBalance: isLoadingBalance && !!account,
      network,
      networkName,
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
