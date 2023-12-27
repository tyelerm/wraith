"use client";
import { cn } from "@/lib/utils";
import { useWalletModalStore } from "@/stores";
import * as Dialog from "@radix-ui/react-dialog";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
    Connector,
    useAccount,
    useConnect,
    useDisconnect,
    useSwitchChain,
} from "wagmi";

const shape =
    "rounded-xl flex flex-col p-6 max-h-screen overflow-y-scroll min-w-[300px] max-w-[400px] w-full";
const color = "border border-indigo-500 bgimg-radial-gradient-purple bg-black";
const position =
    "absolute z-[50] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2";

const WalletDisconnectButtonDynamic = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui"))
            .WalletDisconnectButton,
    { ssr: false }
);
const WalletMultiButtonDynamic = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

export const WalletModal = () => {
    // zustand state
    const show = useWalletModalStore((state: any) => state.isOpen);
    const toggleWalletModal = useWalletModalStore(
        (state: any) => state.toggleWalletModal
    );

    // wagmi connection state
    const { address: _address } = useAccount();
    const [address, setAddress] = useState(undefined as any);
    const { connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { chains, switchChain } = useSwitchChain();

    const [filteredConnectors, setFilteredConnectors] = useState(connectors);

    // solana wallet adapter state
    // const { connection } = useConnection();
    // const {
    //     publicKey,
    //     wallet,
    //     wallets,
    //     autoConnect,
    //     connecting,
    //     connected: solanaConnected,
    //     disconnecting,
    // } = useWallet();

    useEffect(() => {
        console.log("Connectors:", connectors);

        // defualt connectors aka not injected - check wagmi config
        let defaultConnectors = [] as any;
        let injectedConnectors = [] as any;

        // separate installed injected connectors from app-provided default connectors
        connectors.map((connector: Connector) => {
            connector.type !== "injected"
                ? defaultConnectors.push(connector)
                : injectedConnectors.push(connector);
        });

        // if injected connectors does not have a copy of a default connector
        // then add the default connector
        defaultConnectors.map((connector: Connector) => {
            if (
                !injectedConnectors.some(
                    (ic: any) => ic.name === connector.name
                )
            )
                injectedConnectors.push(connector);
        });

        setFilteredConnectors(injectedConnectors);
    }, [connectors]);

    // useEffect(() => {
    //     console.log("Solana Wallet State: ", {
    //         wallet,
    //         wallets,
    //         autoConnect,
    //         solanaConnected,
    //     });
    // }, [wallet, wallets, autoConnect, solanaConnected]);

    return (
        <Dialog.Root open={show} onOpenChange={toggleWalletModal}>
            <Dialog.DialogOverlay className="absolute z-[50] w-screen h-screen bg-black bg-opacity-70" />
            <Dialog.Content
                onOpenAutoFocus={(e) => e?.preventDefault()}
                className={cn(shape, color, position)}
            >
                <div
                    tabIndex={0}
                    className="text-center text-[1.5rem] font-medium mb-4"
                >
                    Connect Wallet
                </div>

                {/* <div>Solana</div>
                <div
                    className="flex flex-col mb-2"
                    onClick={() => toggleWalletModal()}
                >
                    <WalletMultiButtonDynamic
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            backgroundColor: "#545df8",
                        }}
                    />
                </div>

                <div className="mb-5">
                    <WalletDisconnectButtonDynamic
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            backgroundColor: "#545df8",
                        }}
                    />
                </div> */}

                <div>Select Wallet</div>

                <div className="flex flex-col gap-3 mb-5">
                    {filteredConnectors
                        .toReversed()
                        .map((connector: any, index: Number) => {
                            return (
                                <button
                                    onClick={() => toggleWalletModal()}
                                    key={connector.name + ":" + connector.id}
                                >
                                    <ConnectButton connector={connector} />
                                </button>
                            );
                        })}
                </div>

                <div>Select Network</div>

                <div className="flex flex-col">
                    {chains.map((chain: any) => (
                        <button
                            className="w-full select-none bg-indigo-800 rounded-sm px-4 p-1 h-[48px] mb-3 max-w-[100%] items-center"
                            key={chain.id}
                            onClick={() => {
                                switchChain({ chainId: chain.id });
                                toggleWalletModal();
                            }}
                        >
                            {chain.name}
                        </button>
                    ))}
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

import walletConnectIcon from "/public/icons/wallet-connect-icon.png";
import coinbaseWalletIcon from "/public/icons/coinbase-wallet-logo.png";
import ExtensionIcon from "@mui/icons-material/Extension";

export const ConnectButton = ({ connector }: { connector: any }) => {
    const { connect } = useConnect();
    const [icon, setIcon] = useState("");

    useEffect(() => {
        // set icon that comes with connector
        if (connector.icon) setIcon(connector.icon);
        // or set icon based on connector name
        else if (connector.name === "WalletConnect")
            setIcon(walletConnectIcon.src);
        else if (connector.name === "Coinbase Wallet")
            setIcon(coinbaseWalletIcon.src);
        // or set no icon if no matching names
        else setIcon("");
    }, [connector]);

    return (
        <div
            onClick={() => connect({ connector })}
            className="flex items-center justify-between w-full px-4 py-2 text-center bg-indigo-800 rounded-sm cursor-pointer"
        >
            {connector.name}

            {icon ? (
                <img src={icon} className="rounded-md w-9 h-9" />
            ) : (
                <ExtensionIcon
                    style={{ height: "36px", width: "36px" }}
                    className="text-indigo-100 rounded-md"
                />
            )}
        </div>
    );
};
