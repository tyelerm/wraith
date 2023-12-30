import { http, createConfig } from "wagmi";
import {
    bsc,
    mainnet,
    polygon,
    polygonZkEvm,
    polygonZkEvmTestnet,
    sepolia,
} from "wagmi/chains";
import {
    coinbaseWallet,
    walletConnect,
    injected,
    metaMask,
} from "wagmi/connectors";

export const config = createConfig({
    chains: [mainnet, sepolia, bsc, polygon, polygonZkEvm, polygonZkEvmTestnet],
    connectors: [
        // injected({ target: "metaMask" }),
        metaMask(),
        walletConnect({
            relayUrl: "wss://relay.walletconnect.org",
            projectId: "564f4b5f96482369d97247291e29eab3",
        }),
        coinbaseWallet({ appName: "Wraith" }),
    ],
    ssr: true,
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [bsc.id]: http(),
        [polygon.id]: http(),
        [polygonZkEvm.id]: http(),
        [polygonZkEvmTestnet.id]: http(),
    },
});
