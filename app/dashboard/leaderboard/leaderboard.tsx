"use client";
import React, { useEffect, useState } from "react";
import UserTable from "./components/UserTable";

import SearchUser from "./components/SearchUsers";
import CreateUser from "./components/create/CreateUser";
import { randomUsers } from "./components/functions";

export const metadata = {
    title: "Leaderboard",
};

export default function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        console.log(search);

        if (!search || search === "") setSearchResults(users);
        else {
            setSearchResults(
                users.filter((user: any) => user.address.includes(search))
            );
        }
    }, [search]);

    useEffect(() => {
        let rank = 1;
        let _users = randomUsers(15)
            .sort((a: any, b: any) => b.wraith_points - a.wraith_points)
            .map((user: any) => (user = { ...user, rank: rank++ }));
        setUsers(_users);
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <div className="w-full py-4 pr-2 overflow-y-auto md:pr-4">
                <div className="flex gap-2 max-w-[1400px] mx-auto pb-4">
                    <SearchUser setSearch={setSearch} />
                    <CreateUser />
                </div>
                <div className="flex justify-center w-full overflow-x-hidden">
                    <UserTable users={search ? searchResults : users} />
                </div>
            </div>
        </>
    );
}
