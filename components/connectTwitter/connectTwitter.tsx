"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import logo from "/public/icons/x-logo/logo.svg";

export const ConnectTwitter = () => {
    const { data: session } = useSession();
    const handleSignIn = () => signIn("twitter");

    useEffect(() => {
        console.log("Session: ", session);
    }, [session]);

    return (
        <div className="pt-8 ">
            {!session && (
                <button
                    className="w-[300px] p-2 px-4 text-[20px] border border-blue-500 rounded-md bg-[#281667] hover:bg-[#3d2b7d]"
                    onClick={handleSignIn}
                >
                    <div className="flex items-center justify-between flex-nowrap whitespace-nowrap">
                        Connect X
                        <Image src={logo} alt="x" height={24} width={24} />
                    </div>
                </button>
            )}

            {!!session && session.user && (
                <div className="flex p-2 gap-y-1 border bg-[#151439] border-blue-500 flex-wrap rounded-lg  max-w-[400px] relative min-w-[285px]">
                    <div className="flex mr-4 overflow-hidden gap-x-4 flex-nowrap text-ellipsis">
                        {session.user?.image && (
                            <img
                                className="w-16 h-16 rounded-full"
                                src={session.user.image}
                                alt="profile-img"
                            />
                        )}
                        {!session.user?.image && (
                            <div className="flex justify-center w-16 h-16 bg-black rounded-full">
                                <Image
                                    src={logo}
                                    alt="x"
                                    height={32}
                                    width={32}
                                />
                            </div>
                        )}

                        <div className="flex flex-col justify-center whitespace-nowrap">
                            <div className="flex">{session.user.name}</div>
                            <div className="flex">{session.user.email}</div>
                        </div>
                    </div>

                    <div className="absolute ml-auto right-[8px]">
                        <Image src={logo} alt="x" height={20} width={20} />
                    </div>
                    <div className="flex flex-col items-end justify-end ml-auto">
                        <button
                            className="px-2 text-[#d93333] bg-[#6c1c1ca5] border border-[#b31c1c] rounded-sm whitespace-nowrap "
                            onClick={() => signOut()}
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
