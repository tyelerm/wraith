"use client";
import css from "./styles.module.css";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useEffect, useState } from "react";
import {
    Connection,
    useAccount,
    useAccountEffect,
    useBalance,
    useConnect,
    useConnections,
    useDisconnect,
    useEnsName,
} from "wagmi";

import walletConnectIcon from "/public/icons/wallet-connect-icon.png";
import coinbaseWalletIcon from "/public/icons/coinbase-wallet-logo.png";
import { cn, formatTokenAmount } from "@/lib/utils";
import EthereumIcon from "@/public/icons/EthereumIconSvg";
import BnbIconSvg from "@/public/icons/BnbIconSvg";
import MaticIcon from "@/public/icons/MaticIconSvg";
import { bsc, mainnet, polygon } from "viem/chains";
import { useWalletModalStore } from "@/stores";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import ExtensionIcon from "@mui/icons-material/Extension";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import PowerOffIcon from "@mui/icons-material/PowerOff";
const WalletIcon = AccountBalanceWalletOutlinedIcon;

export const WalletStatus = () => {
    const toggleWalletModal = useWalletModalStore(
        (state: any) => state.toggleWalletModal
    );

    const [walletIcon, setWalletIcon] = useState("");

    const { address, isConnected, connector, chainId, chain, status } =
        useAccount();

    const connections = useConnections();

    const { connect } = useConnect();
    const { disconnect } = useDisconnect();

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
                    <DropdownMenuTrigger>
                        <button className="flex flex-col items-start justify-center px-1 text-indigo-200 border-2 border-indigo-700 rounded-lg  min-w-[140px] max-w-[200px] overflow-hidden h-[36px]">
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
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className={cn(
                            css.DropdownMenuContent,
                            "p-1 mt-1 border-2 border-indigo-700 rounded-md select-none whitespace-nowrap overflow-hidden flex flex-col"
                        )}
                    >
                        <button>
                            <DropdownMenuItem
                                onClick={() => toggleWalletModal()}
                                className="flex items-center w-full p-1 px-5 mb-3 text-indigo-200 bg-indigo-900 rounded-sm cursor-pointer hover:text-white "
                            >
                                <PlusCircledIcon className="w-7 h-7" />
                                <div className="w-full font-medium ">
                                    Connect Wallet
                                </div>
                            </DropdownMenuItem>
                        </button>

                        {/* <div className="w-[90%] h-[1px] bg-indigo-900 m-auto my-1" /> */}

                        <div className="px-1 mb-1 text-[0.8rem] ">
                            Connections:
                        </div>

                        <div className="flex flex-col w-full gap-1 overflow-y-auto text-indigo-200 ">
                            {connections?.map((connection: Connection) =>
                                connection.accounts.map((account) => {
                                    return (
                                        <>
                                            <DropdownMenuItem>
                                                <button
                                                    onClick={() => {
                                                        connect(connection);
                                                    }}
                                                    className="flex items-center w-full gap-1 p-1 bg-indigo-900 rounded-sm flex-nowrap hover:text-white"
                                                >
                                                    {connection.connector
                                                        .icon ? (
                                                        <div className="w-6 h-6 ">
                                                            <img
                                                                src={
                                                                    connection
                                                                        .connector
                                                                        .icon
                                                                }
                                                                className="rounded-md"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <ExtensionIcon
                                                            style={{
                                                                height: "24px",
                                                                width: "24px",
                                                            }}
                                                            className="text-indigo-100 rounded-md"
                                                        />
                                                    )}
                                                    <div className="flex font-mono text-[0.9rem] items-center leading-[1]">
                                                        {account.slice(0, 6)}...
                                                        {account.slice(-4)}
                                                    </div>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            disconnect(
                                                                connection
                                                            );
                                                        }}
                                                        className="flex items-center justify-center w-5 h-5 rotate-90 bg-[#27184e] rounded-md hover:scale-110 hover:brightness-100 ml-6"
                                                    >
                                                        <PowerOffIcon
                                                            style={{
                                                                height: "18px",
                                                                width: "18px",
                                                            }}
                                                            className="text-red-500"
                                                        />
                                                    </button>
                                                </button>
                                            </DropdownMenuItem>
                                        </>
                                    );
                                })
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
};
