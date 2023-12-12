import React from "react";
import UserTable from "./components/UserTable";

import SearchUser from "./components/SearchUsers";
import CreateUser from "./components/create/CreateUser";

export default function Users() {
    return (
        <div className="w-full max-w-[1400px] ml-auto mr-auto pt-4 px-3 space-y-5 overflow-y-auto">
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <div className="flex gap-2">
                <SearchUser />
                <CreateUser />
            </div>
            <UserTable />
        </div>
    );
}
