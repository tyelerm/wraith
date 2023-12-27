"use client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SolanaWalletAdapterProvider from "@/components/solana-wallet-adapter-provider";
import { WalletModal } from "@/components/WalletModal/WalletModal";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextAuthProvider } from "@/components/NextAuthProvider";

const queryClient = new QueryClient();

export default function App({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <NextAuthProvider>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <SolanaWalletAdapterProvider>
                            <WalletModal />
                            <main className="">{children}</main>
                            <Toaster />
                        </SolanaWalletAdapterProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </NextAuthProvider>
        </ThemeProvider>
    );
}
