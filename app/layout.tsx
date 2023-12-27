"use client";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SolanaWalletAdapterProvider from "@/components/solana-wallet-adapter-provider";
import { WalletModal } from "@/components/WalletModal/WalletModal";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextAuthProvider } from "@/components/NextAuthProvider";

const jost = Jost({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

const queryClient = new QueryClient();

// export const metadata: Metadata = {
//     metadataBase: new URL("https://daily-todo-task.vercel.app/"),

//     title: {
//         template: "%s | Wraith",
//         default: "Wraith",
//     },
//     authors: {
//         name: "Tyeler McClard, Jeffrey Hernandez",
//     },
//     description:
//         "Build dashboard with role managemanet using next.js and supabase.",
//     openGraph: {
//         title: "Wraith",
//         description: "A Web3 platform for emitting and bridging Wraith",
//         url: "https://wraith.vercel.app/",
//         siteName: "Wraith",
//         images: "/og.png",
//         type: "website",
//     },
//     keywords: ["web3", "faucet", "bridge"],
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="icon"
                    href="/icon?<generated>"
                    type="image/png"
                    sizes="32x32"
                />
            </head>
            <body className={`${jost.className} antialiased dark:bg-[#09090B]`}>
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
            </body>
        </html>
    );
}
