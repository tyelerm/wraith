"use client";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    CoinbaseWalletAdapter,
    PhantomWalletAdapter,
    TrustWalletAdapter,
    WalletConnectWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";
import { ReactNode } from "react";

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css");

export default function SolanaWalletAdapterProvider({
    children,
}: {
    children: ReactNode;
}) {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new CoinbaseWalletAdapter(),
            new TrustWalletAdapter(),
            new WalletConnectWalletAdapter({
                network,
                options: {
                    relayUrl: "wss://relay.walletconnect.com",
                    projectId: "564f4b5f96482369d97247291e29eab3",
                },
            }),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
