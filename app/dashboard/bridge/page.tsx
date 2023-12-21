"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import css from "./styles.module.css";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    TriangleDownIcon,
    TriangleRightIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const networks = ["Network 1", "Network 2", "Network 3", "Network 4"];
const tokens = ["Token 1", "Token 2", "Token 3", "Token 4"];

export default function Bridge() {
    const [balance, setBalance] = useState(12.3456789);
    const [destinationBalance, setDesitnationBalance] = useState(1.234);
    const [sourceNetwork, setSourceNetwork] = useState(networks[0]);
    const [destinationNetwork, setDestinationNetwork] = useState(networks[0]);
    const [amountToBridge, setAmountToBridge] = useState(0.0);
    const [selectedToken, setSelectedToken] = useState(tokens[0]);
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    useEffect(() => {
        console.log("isOpen: ", isOpen);
    }, [isOpen]);

    return (
        <div className="">
            <h1 className="text-3xl font-bold">Bridge</h1>
            <div
                className={
                    css.bgRadialGradient +
                    " border border-indigo-500  rounded-xl w-full max-w-[650px] mx-auto p-6 "
                }
            >
                <div className="flex flex-col overflow-hidden border border-indigo-800 rounded-xl bg-indigo-950">
                    <div className="flex justify-between">
                        <div className="p-2 select-none">
                            <div className="text-gray-400">From</div>
                            <DropdownMenu
                                onOpenChange={(e) => handleOpenChange(e)}
                            >
                                <DropdownMenuTrigger className="flex items-center max-w-[140px] px-2 py-1 bg-indigo-700 rounded-lg w-[120px]">
                                    <div className="w-full">
                                        {sourceNetwork}
                                    </div>
                                    {isOpen && <TriangleRightIcon />}
                                    {!isOpen && <TriangleDownIcon />}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className={cn(
                                        css.DropdownMenuContent,
                                        "w-full absolute top-[4px] cursor-pointer translate-x-[-50%] p-2 bg-indigo-700 rounded-md"
                                    )}
                                >
                                    {networks.map((network, index) => (
                                        <DropdownMenuItem
                                            key={network}
                                            onClick={() =>
                                                setSourceNetwork(network)
                                            }
                                            className="p-1 pl-2 rounded-sm hover:bg-indigo-500"
                                        >
                                            {network}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex flex-col justify-between p-2 text-right">
                            <div className="text-gray-400 ">Balance</div>
                            <div>{balance}</div>
                        </div>
                    </div>
                    <div className="flex justify-between border-t border-t-indigo-800">
                        <div className="flex items-center select-none">
                            <DropdownMenu
                                onOpenChange={(e) => handleOpenChange(e)}
                            >
                                <DropdownMenuTrigger className="flex text-[1.2rem] items-center max-w-[140px] px-2 py-1 border-r border-r-indigo-800 w-[120px] h-full">
                                    <div className="w-full">
                                        {selectedToken}
                                    </div>
                                    {isOpen && <TriangleRightIcon />}
                                    {!isOpen && <TriangleDownIcon />}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className={cn(
                                        css.DropdownMenuContent,
                                        "w-full absolute top-[4px] cursor-pointer translate-x-[-50%] p-2 bg-indigo-700 rounded-md"
                                    )}
                                >
                                    {tokens.map((token, index) => (
                                        <DropdownMenuItem
                                            key={token}
                                            onClick={() =>
                                                setSelectedToken(token)
                                            }
                                            className="p-1 pl-2 text-[1.2rem] rounded-sm hover:bg-indigo-500"
                                        >
                                            {token}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex flex-col w-full p-2 text-right ">
                            <div className="text-[1.6rem] pb-1">
                                {amountToBridge}
                            </div>
                            <div className="flex gap-x-1 text-[0.65rem] text-indigo-400 justify-end">
                                <button
                                    onClick={() =>
                                        setAmountToBridge(balance * 0.25)
                                    }
                                    className="w-12 text-center border border-indigo-400 rounded-full"
                                >
                                    25%
                                </button>
                                <button
                                    onClick={() =>
                                        setAmountToBridge(balance * 0.5)
                                    }
                                    className="w-12 text-center border border-indigo-400 rounded-full"
                                >
                                    50%
                                </button>
                                <button
                                    onClick={() =>
                                        setAmountToBridge(balance * 0.75)
                                    }
                                    className="w-12 text-center border border-indigo-400 rounded-full"
                                >
                                    75%
                                </button>
                                <button
                                    onClick={() => setAmountToBridge(balance)}
                                    className="w-12 text-center border border-indigo-400 rounded-full"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="flex m-auto bg-[#3a2793] rounded-sm w-[2.5rem] justify-center cursor-pointer mt-4">
                    <ArrowDownIcon
                        height={30}
                        width={20}
                        className="mr-[-0.35rem] mt-[0.2rem]"
                    />
                    <ArrowUpIcon
                        height={30}
                        width={20}
                        className="ml-[-0.35rem]"
                    />
                </button>

                <div className="flex justify-between mt-4 overflow-hidden border border-indigo-800 rounded-xl bg-indigo-950">
                    <div className="p-2 ">
                        <div className="text-gray-400">To</div>
                        <DropdownMenu onOpenChange={(e) => handleOpenChange(e)}>
                            <DropdownMenuTrigger className="flex items-center max-w-[140px] px-2 py-1 bg-indigo-700 rounded-lg w-[120px]">
                                <div className="w-full">
                                    {destinationNetwork}
                                </div>
                                {isOpen && <TriangleRightIcon />}
                                {!isOpen && <TriangleDownIcon />}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className={cn(
                                    css.DropdownMenuContent,
                                    "w-full absolute top-[4px] cursor-pointer translate-x-[-50%] p-2 bg-indigo-700 rounded-md"
                                )}
                            >
                                {networks.map((network, index) => (
                                    <DropdownMenuItem
                                        key={network}
                                        onClick={() =>
                                            setDestinationNetwork(network)
                                        }
                                        className="p-1 pl-2 rounded-sm hover:bg-indigo-500"
                                    >
                                        {network}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex flex-col justify-between p-2 text-right ">
                        <div className="text-gray-400">Balance</div>
                        <div>{destinationBalance}</div>
                    </div>
                </div>

                <button className="py-2 block m-auto mt-6 text-center bg-indigo-700 rounded-full max-w-[275px] w-full">
                    Connect wallet to bridge
                </button>
            </div>
        </div>
    );
}
