"use client";
import { useWalletModalStore } from "@/stores";
import { useEffect } from "react";

export const ConnectWallet = () => {
    const toggleWalletModal = useWalletModalStore(
        (state: any) => state.toggleWalletModal
    );
    const isOpen = useWalletModalStore((state: any) => state.isOpen);

    useEffect(() => {
        console.log("Wallet modal isOpen: ", isOpen);
    }, [isOpen]);

    return (
        <div
            onClick={() => toggleWalletModal()}
            className="px-4 py-[6px] ml-auto font-medium bg-indigo-700 rounded-lg cursor-pointer select-none whitespace-nowrap w-fit"
        >
            Connect Wallet
        </div>
    );
};
