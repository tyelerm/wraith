"use client";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import WagmiProvider from "@/components/wagmi-provider";
import SolanaWalletAdapterProvider from "@/components/solana-wallet-adapter-provider";
import { WalletModal } from "@/components/walletModal/walletModal";
import { SessionProvider } from "next-auth/react";

const jost = Jost({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

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
                    <SessionProvider>
                        <WagmiProvider>
                            <SolanaWalletAdapterProvider>
                                <WalletModal />
                                <main className="">{children}</main>
                                <Toaster />
                            </SolanaWalletAdapterProvider>
                        </WagmiProvider>
                    </SessionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
