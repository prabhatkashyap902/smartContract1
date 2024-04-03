import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';


import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const config = getDefaultConfig({
	appName: 'RainbowKit demo',
	projectId: 'YOUR_PROJECT_ID',
	chains: [mainnet, polygon, optimism, arbitrum, sepolia],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<RainbowKitProvider>
						<App />
					</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
	</React.StrictMode>,
)
