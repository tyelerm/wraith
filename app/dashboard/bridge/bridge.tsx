"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import css from "./styles.module.css";
import { TriangleDownIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { cn, formatBalance } from "@/lib/utils";
import { AmountInput } from "./amountInput/amountInput";
import BigNumber from "bignumber.js";
import { useAccount, useBalance } from "wagmi";
import { useWalletModalStore } from "@/stores";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const networks = ["Sepolia ETH", "Wraith Testnet"];
const tokens = ["Token 1", "Token 2", "Token 3", "Token 4"];

export default function Bridge() {
    const [destinationBalance, setDesitnationBalance] = useState(1.234);
    const [sourceNetwork, setSourceNetwork] = useState(networks[0]);
    const [destinationNetwork, setDestinationNetwork] = useState(networks[1]);
    const [amountToBridge, setAmountToBridge] = useState<BigNumber>();
    const [selectedToken, setSelectedToken] = useState(tokens[0]);
    const [inputError, setInputError] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);

    const toggleWalletModal = useWalletModalStore(
        (state: any) => state.toggleWalletModal
    );

    const { address, isConnected, chainId } = useAccount();

    const balance = useBalance({
        address: address || undefined,
        chainId: chainId,
    });

    useEffect(() => {
        console.log("Balance: ", balance);
    }, [balance]);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    const onAmountInputChange = ({
        amount,
        error,
    }: {
        amount?: BigNumber;
        error?: string;
    }) => {
        setAmountToBridge(amount);
        setInputError(error);
    };

    const reverseSwapTargets = () => {
        let srcNet = sourceNetwork;
        let dstNet = destinationNetwork;
        setSourceNetwork(dstNet);
        setDestinationNetwork(srcNet);
    };

    return (
        <div className="flex flex-col overflow-hidden">
            <h1 className="text-3xl font-bold">Bridge</h1>
            <div className="overflow-y-auto">
                <div
                    className={
                        css.bgRadialGradient +
                        " border border-indigo-500 rounded-xl w-full max-w-[650px] mx-auto p-3 py-6 sm:p-6 overflow-y-auto"
                    }
                >
                    <div className="flex flex-col overflow-hidden border border-indigo-800 rounded-xl bg-indigo-950">
                        <div className="flex justify-between">
                            <div className="p-2 select-none whitespace-nowrap">
                                <div className="text-gray-500">From</div>
                                <DropdownMenu
                                    onOpenChange={(e) => handleOpenChange(e)}
                                >
                                    <DropdownMenuTrigger className="flex items-center max-w-[140px] px-2 py-1 bg-indigo-700 rounded-lg w-[140px]">
                                        <div className="w-full">
                                            {sourceNetwork}
                                        </div>
                                        {isOpen && (
                                            <TriangleRightIcon
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                        {!isOpen && (
                                            <TriangleDownIcon
                                                width={24}
                                                height={24}
                                            />
                                        )}
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
                                <div className="text-gray-500 ">Balance</div>
                                <div>{formatBalance(balance)}</div>
                            </div>
                        </div>
                        <div className="flex border-t border-t-indigo-800">
                            <div className="flex items-center select-none whitespace-nowrap">
                                <DropdownMenu
                                    onOpenChange={(e) => handleOpenChange(e)}
                                >
                                    <DropdownMenuTrigger className="flex text-[1.2rem] items-center sm:w-[140px] px-2 py-1 border-r border-r-indigo-800  h-full">
                                        <div className="w-full">
                                            {selectedToken}
                                        </div>
                                        {isOpen && (
                                            <TriangleRightIcon
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                        {!isOpen && (
                                            <TriangleDownIcon
                                                width={24}
                                                height={24}
                                            />
                                        )}
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
                                                className="p-1 text-[1.2rem] rounded-sm hover:bg-indigo-500"
                                            >
                                                {token}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <AmountInput
                                balance={balance}
                                onChange={onAmountInputChange}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => reverseSwapTargets()}
                        className="flex m-auto bg-[#3a2793] rounded-sm w-[2.5rem] justify-center cursor-pointer mt-4"
                    >
                        <SwapVertIcon
                            style={{ height: "30px", width: "30px" }}
                            className="text-indigo-200"
                        />
                    </button>

                    <div className="flex justify-between mt-4 overflow-hidden border border-indigo-800 rounded-xl bg-indigo-950">
                        <div className="p-2 whitespace-nowrap">
                            <div className="text-gray-500">To</div>
                            <DropdownMenu
                                onOpenChange={(e) => handleOpenChange(e)}
                            >
                                <DropdownMenuTrigger className="flex items-center max-w-[140px] px-2 py-1 bg-indigo-700 rounded-lg w-[140px]">
                                    <div className="w-full">
                                        {destinationNetwork}
                                    </div>
                                    {isOpen && (
                                        <TriangleRightIcon
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                    {!isOpen && (
                                        <TriangleDownIcon
                                            width={24}
                                            height={24}
                                        />
                                    )}
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
                            <div className="text-gray-500">Balance</div>
                            <div>{destinationBalance}</div>
                        </div>
                    </div>

                    {!isConnected ? (
                        <button
                            onClick={() => toggleWalletModal()}
                            className="py-2 block m-auto mt-6 text-center bg-indigo-700 rounded-full max-w-[275px] w-full"
                        >
                            Connect wallet to bridge
                        </button>
                    ) : (
                        <button
                            disabled={
                                !amountToBridge ||
                                amountToBridge.isZero() ||
                                inputError !== undefined
                            }
                            className="py-2 block m-auto mt-6 text-center bg-indigo-700 rounded-full max-w-[275px] w-full"
                        >
                            Confirm
                        </button>
                    )}

                    {amountToBridge && inputError && (
                        <div className="pt-3 text-center text-red-500">
                            {inputError}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
