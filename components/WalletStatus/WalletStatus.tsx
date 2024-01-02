"use client";
import css from "./styles.module.css";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useEffect, useState } from "react";
import {
    useAccount,
    useAccountEffect,
    useBalance,
    useConnections,
    useEnsName,
} from "wagmi";

import walletConnectIcon from "/public/icons/wallet-connect-icon.png";
import coinbaseWalletIcon from "/public/icons/coinbase-wallet-logo.png";
import { cn, formatTokenAmount } from "@/lib/utils";
import EthereumIcon from "@/public/icons/EthereumIconSvg";
import BnbIconSvg from "@/public/icons/BnbIconSvg";
import MaticIcon from "@/public/icons/MaticIconSvg";
import { bsc, mainnet, polygon } from "viem/chains";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { ConnectionsMenu } from "./ConnectionsMenu";
const WalletIcon = AccountBalanceWalletOutlinedIcon;

export const WalletStatus = () => {
    const [walletIcon, setWalletIcon] = useState("");

    const { address, isConnected, connector, chainId, chain, status } =
        useAccount();

    const connections = useConnections();

    const balance = useBalance({
        address: address || undefined,
        chainId: chainId,
    });

    const ensname = useEnsName({
        address: address || undefined,
        chainId: chainId,
    });

    useAccountEffect({
        onConnect(data) {
            console.log("Connected!", data);
        },
        onDisconnect() {
            console.log("Disconnected!");
        },
    });

    useEffect(() => {
        console.log("connections:", connections);
    }, [connections]);

    useEffect(() => {
        console.log("isConnected:", isConnected);
    }, [isConnected]);

    useEffect(() => {
        console.log("balance:", balance.data);
    }, [balance]);

    useEffect(() => {
        console.log("ensname:", ensname.data);
    }, [ensname]);

    useEffect(() => {
        console.log("chain:", chain);
    }, [chain]);

    useEffect(() => {
        console.log("status:", status);
    }, [status]);

    useEffect(() => {
        console.log("active chain:", chainId);
    }, [chainId]);

    useEffect(() => {
        console.log("address:", address);
    }, [address]);

    useEffect(() => {
        console.log("active connector:", connector);
        // set no icon
        if (!connector) {
            setWalletIcon("");
            return;
        }
        // set icon that comes with connector
        if (connector.icon) setWalletIcon(connector.icon);
        // set icon based on connector name
        else if (connector.name === "WalletConnect")
            setWalletIcon(walletConnectIcon.src);
        else if (connector.name === "Coinbase Wallet")
            setWalletIcon(coinbaseWalletIcon.src);
        // set no icon if no matching names
        else setWalletIcon("");
    }, [connector]);

    return (
        <>
            {(isConnected ||
                status === "reconnecting" ||
                status === "connecting") && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-col items-start justify-center px-1 text-indigo-200 border-2 border-indigo-700 rounded-lg  min-w-[140px] max-w-[200px] overflow-hidden h-[36px]">
                        <div className="flex text-[14px] leading-[1.1] gap-x-1 w-full items-center">
                            {walletIcon ? (
                                <img
                                    src={walletIcon}
                                    height={24}
                                    width={24}
                                    className="w-6 h-6 mr-1 rounded-sm"
                                />
                            ) : (
                                <WalletIcon className="w-6 h-6 mr-1" />
                            )}
                            <div className="flex flex-col overflow-hidden text-ellipsis">
                                <div className="flex ">
                                    {ensname?.data && ensname.data}
                                    {!ensname?.data && address && (
                                        <>
                                            <div className="font-mono">
                                                {address.slice(0, 6)}
                                            </div>
                                            <div>...</div>
                                            <div className="font-mono">
                                                {address.slice(-4)}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center justify-end w-full gap-x-1 ">
                                    {chainId && (
                                        <div className="flex items-center justify-center w-3 h-3 ">
                                            {chainId === mainnet.id && (
                                                <EthereumIcon
                                                    width={12}
                                                    height={12}
                                                />
                                            )}
                                            {chainId === bsc.id && (
                                                <BnbIconSvg
                                                    width={12}
                                                    height={12}
                                                />
                                            )}
                                            {chainId === polygon.id && (
                                                <MaticIcon
                                                    width={12}
                                                    height={12}
                                                />
                                            )}
                                        </div>
                                    )}
                                    <div className="overflow-hidden text-ellipsis">
                                        {balance?.data &&
                                            formatTokenAmount(
                                                balance.data.value
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className={cn(
                            css.DropdownMenuContent,
                            "p-1 mt-1 border-2 bg-black border-indigo-700 rounded-md select-none whitespace-nowrap overflow-hidden flex flex-col"
                        )}
                    >
                        <ConnectionsMenu connections={connections} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
};
