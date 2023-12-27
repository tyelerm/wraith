import { Jost } from "next/font/google";
import "./globals.css";
import App from "./App";
import type { Metadata } from "next";

const jost = Jost({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://localhost:3000/"),

    title: {
        template: "%s | Wraith",
        default: "Wraith",
    },
    authors: {
        name: "Tyeler McClard, Jeffrey Hernandez",
    },
    description:
        "Build dashboard with role managemanet using next.js and supabase.",
    openGraph: {
        title: "Wraith",
        description: "A Web3 platform for emitting and bridging Wraith",
        url: "https://wraith.vercel.app/",
        siteName: "Wraith",
        images: "/og.png",
        type: "website",
    },
    keywords: ["web3", "faucet", "bridge"],
};

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
                <App>{children}</App>
            </body>
        </html>
    );
}
