"use client";
import { ConnectTwitter } from "@/components/connectTwitter/connectTwitter";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function Dashboard() {
    const { data: session } = useSession();

    const test = async () => {
        await fetch("/api/twitter/2/users/me");
    };

    const test2 = async () => {
        let tweet = "This text will appear in your tweet";
        await fetch("/api/twitter/2/tweets", {
            method: "POST",
            body: tweet,
        });
    };

    useEffect(() => {
        //@ts-ignore
        if (!session || !session.token.access_token) return;
        // test();
    }, [session]);

    return (
        <div className="">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <ConnectTwitter />
        </div>
    );
}
