"use client";
import { ReactNode, useEffect, useState } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, bsc, polygon, polygonZkEvm } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
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
    const [providers, setProviders] = useState([]);
    const [config, setConfig] = useState(
        createConfig({
            autoConnect: true,
            publicClient,
            webSocketPublicClient,
        })
    );

    useEffect(() => {
        if (typeof window === "undefined" || !window.ethereum) return;
        let providers = window.ethereum.providers;
        let results = [] as any;
        providers.map((provider: any) => {
            let isRainbow = provider.isRainbow;
            let providerEntry = {
                provider: provider,
                name: isRainbow ? "Rainbow" : "MetaMask",
            };
            results.push(providerEntry);
        });
        setProviders(results);
        // console.log(results);

        let connectors = [] as any;

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
