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
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import dynamic from "next/dynamic";

const networks = ["Wraith Testnet"];
const tokens = ["ETH"];

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

export default function Faucet() {
    const { address: _address, isConnected, connector } = useAccount();
    const [address, setAddress] = useState(undefined as any);
    const { disconnect } = useDisconnect();
    const { connectors } = useConnect();
    const [selectedNetwork, setSelectedNetwork] = useState("");
    const [selectedToken, setSelectedToken] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setAddress(_address);
    }, [_address]);

    useEffect(() => {
        setSelectedNetwork(networks[0]);
        setSelectedToken(tokens[0]);
    }, []);

    useEffect(() => {
        console.log(connector);
    }, [connector]);

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
                    This faucet transfers ETH to a users address on Wraith's
                    testnet. Confirm details before submitting
                </div>

                <div>Network</div>
                <div className="flex gap-2 p-1 mb-5 bg-indigo-700 rounded-md select-none flex-nowrap">
                    {networks.map((network) => (
                        <div
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
                <div className="flex justify-between p-3 mb-16 bg-indigo-700 rounded-md select-none flex-nowrap">
                    <div className="font-mono text-[#999999] overflow-hidden text-ellipsis">
                        0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    </div>
                    <div className="text-[#d3d1ff] cursor-pointer pl-4">
                        Paste
                    </div>
                </div>

                <div>Solana</div>
                <div className="flex flex-col mb-5">
                    <WalletMultiButtonDynamic
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            backgroundColor: "#545df8",
                        }}
                    />

                    {/* {isConnected && <WalletDisconnectButtonDynamic />} */}
                </div>

                <div>EVM, BSC, MATIC</div>

                <div className="flex flex-col gap-3 mb-5">
                    {connectors.map((connector: any, index: Number) => {
                        if (index === 1)
                            connector.name =
                                "MetaMask (but actually whichever extension injects first)";
                        return (
                            <ConnectButton
                                key={connector.name}
                                connector={connector}
                            />
                        );
                    })}
                </div>

                <div className="px-4 p-1 gap-4 mb-5 max-w-[100%] items-center w-full overflow-hidden flex justify-between whitespace-nowrap flex-nowrap text-left select-none bg-[#545df8] rounded-md">
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
            </div>
        </>
    );
}

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

export const TestButton = ({ provider }: { provider: any }) => {
    const { connect } = useConnect({
        connector: new InjectedConnector({
            options: {
                name: "MetaMask",
                getProvider: () => {
                    let provider = undefined;
                    if (typeof window !== "undefined")
                        provider = window.ethereum.providers[1];
                    return provider;
                },
            },
        }),
        // connector: new MetaMaskConnector({}),
    });

    return (
        <div
            onClick={() => connect()}
            className="p-3 font-medium text-center select-none bg-[#545df8] hover:bg-[#545cf8b5] rounded-md cursor-pointer mb-5"
        >
            Connection Test
        </div>
    );
};
