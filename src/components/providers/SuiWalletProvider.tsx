'use client';
import React, { useState, useEffect } from 'react';

import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';

const { networkConfig } = createNetworkConfig({
	localnet: { 
		url: 'http://127.0.0.1:9000',
		// @ts-ignore
		network: 'localnet' 
	},
	devnet: { 
		url: 'https://fullnode.devnet.sui.io:443',
		// @ts-ignore
		network: 'devnet'
	},
	testnet: { 
		url: 'https://fullnode.testnet.sui.io:443',
		// @ts-ignore
		network: 'testnet'
	},
	mainnet: { 
		url: 'https://fullnode.mainnet.sui.io:443',
		// @ts-ignore
		network: 'mainnet'
	},
});

const queryClient = new QueryClient();

export default function SuiWalletProvider({ children }: { children: React.ReactNode }) {
	const [defaultNetwork, setDefaultNetwork] = useState<'mainnet' | 'testnet' | 'devnet' | 'localnet'>('mainnet');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const savedNetwork = localStorage.getItem('suiNetwork');
		if (savedNetwork && (savedNetwork === 'mainnet' || savedNetwork === 'testnet' || savedNetwork === 'devnet' || savedNetwork === 'localnet')) {
			setDefaultNetwork(savedNetwork as 'mainnet' | 'testnet' | 'devnet' | 'localnet');
		}
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<QueryClientProvider client={queryClient}>
			<SuiClientProvider networks={networkConfig} defaultNetwork={defaultNetwork}>
				<WalletProvider autoConnect>
					{children}
				</WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
	);
}
