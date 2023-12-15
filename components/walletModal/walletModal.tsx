"use client";
import { cn } from "@/lib/utils";
import { useWalletModalStore } from "@/stores";
import * as Dialog from "@radix-ui/react-dialog";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const shape = "rounded-xl flex flex-col p-6 min-w-[300px] max-w-[500px] w-full";
const color =
    "border border-indigo-500 bg-[radial-gradient(92%_81.55%_at_50%_15%,rgba(68,3,193,1)_0%,rgba(23,9,35,1)_100%)]";
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
    const { address: _address, isConnected, connector } = useAccount();
    const [address, setAddress] = useState(undefined as any);
    const { connectors } = useConnect();
    const { disconnect } = useDisconnect();

    // solana wallet adapter state
    const { connection } = useConnection();
    const {
        publicKey,
        wallet,
        wallets,
        autoConnect,
        connecting,
        connected: solanaConnected,
        disconnecting,
    } = useWallet();

    useEffect(() => {
        setAddress(_address);
    }, [_address]);

    useEffect(() => {
        console.log(connector);
    }, [connector]);

    useEffect(() => {
        console.log("Solana Wallet State: ", {
            wallet,
            wallets,
            autoConnect,
            solanaConnected,
        });
    }, [wallet, wallets, autoConnect, solanaConnected]);

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

                <div>Solana</div>
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
                </div>

                <div>EVM, BSC, MATIC</div>

                <div className="flex flex-col gap-3 mb-5">
                    {connectors.map((connector: any, index: Number) => {
                        if (index === 1)
                            connector.name =
                                "MetaMask (but actually whichever extension injects first)";
                        return (
                            <div onClick={() => toggleWalletModal()}>
                                <ConnectButton
                                    key={connector.name}
                                    connector={connector}
                                />
                            </div>
                        );
                    })}
                </div>

                <div
                    className={
                        "px-4 p-1 gap-4 mb-5 max-w-[100%] items-center w-full overflow-hidden flex justify-between whitespace-nowrap flex-nowrap text-left select-none bg-[#545df8] rounded-md"
                    }
                >
                    Connected to:{" "}
                    <div className="overflow-hidden font-mono text-ellipsis">
                        {!!address &&
                            address?.slice(0, 6) + "..." + address?.slice(-4)}
                    </div>
                    <div
                        onClick={() => disconnect()}
                        className="px-3 py-1 bg-indigo-700 rounded-sm cursor-pointer"
                    >
                        Disconnect
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export const ConnectButton = ({ connector }: { connector: any }) => {
    const { connect } = useConnect({ connector });
    const [name, setName] = useState("");
    useEffect(() => {
        setName(connector.name);
    }, [connector]);
    return (
        <div
            onClick={() => connect()}
            className="bg-[#545df8] py-3 w-full text-center rounded-sm cursor-pointer"
        >
            {name}
        </div>
    );
};
