"use client";
import { ReactNode, useEffect, useState } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, bsc, polygon, polygonZkEvm } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, bsc, polygon, polygonZkEvm],
    [publicProvider()]
);

// const config = createConfig({
//     autoConnect: true,
//     publicClient,
//     webSocketPublicClient,
// });

const _window = typeof window === "undefined" ? undefined : window;

export default function WagmiProvider({ children }: { children: ReactNode }) {
    const [window_, setWindow] = useState(_window);
    const [config, setConfig] = useState(
        createConfig({
            autoConnect: true,
            publicClient,
            webSocketPublicClient,
        })
    );

    useEffect(() => {
        if (typeof window_ === "undefined" || !window_.ethereum) return;
        let connectors = [] as any;

        //Default injected connector
        connectors.push(
            new InjectedConnector({
                options: {
                    name: "Injected",
                },
            })
        );

        connectors.push(new MetaMaskConnector());

        connectors.push(
            new WalletConnectConnector({
                options: {
                    projectId: "564f4b5f96482369d97247291e29eab3",
                },
            })
        );

        // (failsafe) Get array of providers mounted to window.ethereum
        // aka: wallets injected into the browser by extensions or plugins
        let providers = window_.ethereum.providers;
        console.log(window_);
        let results = [] as any;
        providers?.map((provider: any, index: number) => {
            let isRainbow = provider.isRainbow;
            let providerEntry = {
                provider: provider,
                name: isRainbow ? "Rainbow" : `Provider ${index}`,
            };
            results.push(providerEntry);
        });
        // console.log(results);

        // Make connector for each provider found
        results.map((provider: any) => {
            let connector = new InjectedConnector({
                options: {
                    name: provider.name,
                    shimDisconnect: true,
                    getProvider: () => {
                        return provider.provider;
                    },
                },
            });
            connectors.push(connector);
        });

        // console.log("CONNECTORS: ", connectors);

        let newConfig = createConfig({
            autoConnect: true,
            connectors: connectors,
            publicClient,
            webSocketPublicClient,
        });

        setConfig(newConfig);
    }, [window_]);

    return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
