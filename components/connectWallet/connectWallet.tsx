"use client";
import { useWalletModalStore } from "@/stores";
import { useAccount } from "wagmi";

export const ConnectWallet = () => {
    const toggleWalletModal = useWalletModalStore(
        (state: any) => state.toggleWalletModal
    );
    const { isConnected } = useAccount();

    return (
        <>
            {!isConnected && (
                <div
                    onClick={() => toggleWalletModal()}
                    className="px-4 py-[6px] ml-auto font-medium bg-indigo-700 rounded-lg cursor-pointer select-none whitespace-nowrap w-fit"
                >
                    Connect Wallet
                </div>
            )}
        </>
    );
};
