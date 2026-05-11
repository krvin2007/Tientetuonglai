'use client';

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
	return (
		<QueryClientProvider client={queryClient}>
			<SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
				<WalletProvider autoConnect>
					{children}
				</WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
	);
}
