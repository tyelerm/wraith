"use client";

import css from "./styles.module.css";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const networks = ["Wraith Testnet"];
const tokens = ["ETH"];

export default function Faucet() {
    const [selectedNetwork, setSelectedNetwork] = useState("");
    const [selectedToken, setSelectedToken] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelectedNetwork(networks[0]);
        setSelectedToken(tokens[0]);
    }, []);

    const selectStyle = (network: string) => {
        return (
            "w-full py-2 text-center whitespace-nowrap rounded-sm cursor-pointer" +
            (network === selectedNetwork ? " bg-indigo-500 " : "")
        );
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <>
            <h1 className="pt-2 pl-4 text-3xl font-bold">Faucet</h1>
            <div className="p-6 min-w-[300px] max-w-[500px] bg-[radial-gradient(112%_89.55%_at_50%_15%,rgba(97,21,245,0.66)_0%,rgba(41,16,63,0.47)_100%)] w-full rounded-xl border border-indigo-500 mt-4 m-auto">
                <div className="text-[1.5rem] font-medium pb-2">Get Tokens</div>
                <div className="text-[0.8rem] w-[20rem] text-gray-300 pb-10">
                    This faucet transfers ETH to a users
                    address on Wraith's testnet.
                    Confirm details before submitting
                </div>

                <div>Network</div>
                <div className="flex gap-2 p-1 mb-5 bg-indigo-700 rounded-md select-none flex-nowrap">
                    {networks.map((network) => (
                        <div
                            onClick={() => setSelectedNetwork(network)}
                            className={cn(selectStyle(network))}
                        >
                            {network}
                        </div>
                    ))}
                </div>

                <div>Select Token</div>
                <div className="mb-5 bg-indigo-700 rounded-md select-none">
                    <DropdownMenu onOpenChange={(e) => handleOpenChange(e)}>
                        <DropdownMenuTrigger className="flex items-center justify-between w-full p-3">
                            {selectedToken}
                            {isOpen && <TriangleRightIcon />}
                            {!isOpen && <TriangleDownIcon />}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className={cn(
                                css.DropdownMenuContent,
                                "w-full absolute top-[4px] cursor-pointer translate-x-[-50%] p-2 bg-indigo-700 rounded-md"
                            )}
                        >
                            {tokens.map((token) => (
                                <DropdownMenuItem
                                    onClick={() => setSelectedToken(token)}
                                    className="p-1 pl-2 rounded-sm hover:bg-indigo-500"
                                >
                                    {token}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div>Wallet Address</div>
                <div className="flex justify-between p-3 mb-16 bg-indigo-700 rounded-md select-none flex-nowrap">
                    <div className="font-mono text-[#999999] overflow-hidden text-ellipsis">
                        0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    </div>
                    <div className="text-[#d3d1ff] cursor-pointer pl-4">
                        Paste
                    </div>
                </div>

                <div className="p-3 font-medium text-center select-none bg-[#545df8] hover:bg-[#545cf8b5] rounded-md cursor-pointer">
                    Connect to get tokens
                </div>
            </div>
        </>
    );
}
