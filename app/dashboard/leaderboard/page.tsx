import React from "react";
import UserTable from "./components/UserTable";

import SearchUser from "./components/SearchUsers";
import CreateUser from "./components/create/CreateUser";

export const metadata = {
    title: "Leaderboard",
};

export default function Users() {
    return (
        <>
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <div className="w-full py-4 pr-2 overflow-y-auto md:pr-4">
                <div className="flex gap-2 max-w-[1400px] mx-auto pb-4">
                    <SearchUser />
                    <CreateUser />
                </div>
                <div className="flex justify-center w-full overflow-x-hidden">
                    <UserTable />
                </div>
            </div>
        </>
    );
}
