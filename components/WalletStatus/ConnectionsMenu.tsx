"use client";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import { useWalletModalStore } from "@/stores";
import { Connection, Connector, useConnect, useDisconnect } from "wagmi";
import ExtensionIcon from "@mui/icons-material/Extension";
import walletConnectIcon from "/public/icons/wallet-connect-icon.png";
import coinbaseWalletIcon from "/public/icons/coinbase-wallet-logo.png";

export const ConnectionsMenu = ({
    connections,
}: {
    connections: Array<Connection>;
}) => {
    const toggleWalletModal = useWalletModalStore(
        (state: any) => state.toggleWalletModal
    );

    const { connect } = useConnect();
    const { disconnect } = useDisconnect();

    const getConnectorIcon = (connector: Connector) => {
        if (connector.name === "WalletConnect") {
            return <img src={walletConnectIcon.src} className="w-6 h-6" />;
        } else if (connector.name === "Coinbase Wallet") {
            return <img src={coinbaseWalletIcon.src} className="w-6 h-6" />;
        } else {
            return (
                <ExtensionIcon
                    style={{
                        height: "24px",
                        width: "24px",
                    }}
                    className="text-indigo-100 rounded-md"
                />
            );
        }
    };

    return (
        <>
            <button>
                <DropdownMenuItem
                    onClick={() => toggleWalletModal()}
                    className="flex items-center w-full p-1 px-5 mb-3 text-indigo-200 bg-indigo-900 rounded-sm cursor-pointer hover:text-white "
                >
                    <PlusCircledIcon className="w-7 h-7" />
                    <div className="w-full font-medium ">Connect Wallet</div>
                </DropdownMenuItem>
            </button>

            <div className="px-1 mb-1 text-[0.8rem] ">Connections:</div>

            <div className="flex flex-col w-full gap-1 overflow-y-auto text-indigo-200 ">
                {connections?.map((connection: Connection) =>
                    connection.accounts.map((account) => {
                        return (
                            <DropdownMenuItem
                                key={connection.connector.uid}
                                className="relative"
                            >
                                <button
                                    onClick={() => {
                                        connect(connection);
                                    }}
                                    className="flex items-center w-full p-1 bg-indigo-900 rounded-sm gap-x-2 flex-nowrap hover:text-white"
                                >
                                    {connection.connector.icon ? (
                                        <div className="w-6 h-6 ">
                                            <img
                                                src={connection.connector.icon}
                                                className="rounded-md"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            {getConnectorIcon(
                                                connection.connector
                                            )}
                                        </>
                                    )}
                                    <div className="flex font-mono text-[0.9rem] items-center leading-[1]">
                                        {account.slice(0, 6)}...
                                        {account.slice(-4)}
                                    </div>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        disconnect(connection);
                                    }}
                                    className="absolute top-1/2 -translate-y-1/2 right-[0.25rem] flex items-center justify-center w-5 h-5 rotate-90 bg-[#27184e] rounded-md hover:scale-110 hover:brightness-100 ml-6"
                                >
                                    <PowerOffIcon
                                        style={{
                                            height: "18px",
                                            width: "18px",
                                        }}
                                        className="text-red-500"
                                    />
                                </button>
                            </DropdownMenuItem>
                        );
                    })
                )}
            </div>
        </>
    );
};
