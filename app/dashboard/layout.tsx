import React, { ReactNode, useEffect } from "react";
import SideNav from "./components/SideNav";
import ToggleSidebar from "./components/ToggleSidebar";
import MobileSideNav from "./components/MobileSideNav";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useWalletModalStore } from "@/stores";
import { ConnectWallet } from "@/components/ConnectWallet/ConnectWallet";
import { WalletModal } from "@/components/WalletModal/WalletModal";
import { WalletStatus } from "@/components/WalletStatus/WalletStatus";

export default async function Layout({ children }: { children: ReactNode }) {
    const { data: userSession } = await readUserSession();

    if (!userSession.session) {
        return redirect("/auth");
    }

    return (
        <div className="flex w-full">
            <div className="flex flex-col h-screen max-h-screen">
                <SideNav />
                <MobileSideNav />
            </div>

            <div className="flex flex-col w-full h-screen max-h-screen pl-2 overflow-hidden bg-gray-100 md:pl-4 dark:bg-inherit">
                <div className="flex items-center gap-2 p-2 pl-0">
                    <ToggleSidebar />
                    <div className="flex items-center gap-4 ml-auto">
                        <WalletStatus />
                        <ConnectWallet />
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
}
