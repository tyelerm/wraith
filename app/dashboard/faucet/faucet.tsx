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
import { useAccount } from "wagmi";
import { isAddress } from "viem";

const PLACEHOLDER_ADDRESS = "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const networks = ["Wraith Testnet"];
const tokens = ["ETH"];

export default function Faucet() {
    const [receiverAddress, setReceiverAddress] =
        useState<any>(PLACEHOLDER_ADDRESS);
    const [selectedNetwork, setSelectedNetwork] = useState("");
    const [selectedToken, setSelectedToken] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { isConnected, address } = useAccount();

    useEffect(() => {
        setSelectedNetwork(networks[0]);
        setSelectedToken(tokens[0]);
    }, []);

    useEffect(() => {
        if (address) setReceiverAddress(address);
    }, [address]);

    const selectStyle = (network: string) => {
        return (
            "w-full py-2 text-center whitespace-nowrap rounded-sm cursor-pointer" +
            (network === selectedNetwork ? " bg-indigo-500 " : "")
        );
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    async function pasteReceiverAddress() {
        await navigator.clipboard
            .readText()
            .then((text) => setReceiverAddress(text));
    }

    return (
        <div className="mr-2 md:mr-4">
            <h1 className="text-3xl font-bold">Faucet</h1>
            <div className="p-6 min-w-[300px] max-w-[500px] bgimg-radial-gradient-purple w-full rounded-xl border border-indigo-500 mt-4 m-auto">
                <div className="text-[1.5rem] font-medium pb-2">Get Tokens</div>
                <div className="text-[0.8rem] max-w-[20rem] text-gray-300 pb-10">
                    This faucet transfers ETH to a users address on Wraith's
                    testnet. Confirm details before submitting
                </div>

                <div>Network</div>
                <div
                    tabIndex={0}
                    className="flex gap-2 p-1 mb-5 bg-indigo-700 rounded-md select-none flex-nowrap"
                >
                    {networks.map((network, index) => (
                        <div
                            tabIndex={index}
                            key={network}
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
                            {tokens.map((token, index) => (
                                <DropdownMenuItem
                                    key={token}
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
                <div
                    tabIndex={0}
                    className="flex justify-between p-3 mb-10 bg-indigo-700 rounded-md flex-nowrap"
                >
                    <div
                        className={
                            " font-mono overflow-hidden text-ellipsis " +
                            (receiverAddress === PLACEHOLDER_ADDRESS
                                ? " text-[#999999] "
                                : " text-indigo-200 ")
                        }
                    >
                        {receiverAddress}
                    </div>
                    <button
                        onClick={() => pasteReceiverAddress()}
                        className="text-[#d3d1ff] cursor-pointer pl-4"
                    >
                        Paste
                    </button>
                </div>

                <button
                    disabled={
                        !isConnected ||
                        receiverAddress === PLACEHOLDER_ADDRESS ||
                        !isAddress(receiverAddress)
                    }
                    className="py-2 block m-auto text-center bg-indigo-700 rounded-full max-w-[275px] w-full"
                >
                    Dispense Tokens
                </button>
            </div>
        </div>
    );
}
