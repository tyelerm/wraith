"use client";
import React from "react";
import ListOfUsers from "./ListOfUsers";
import LeaderboardTable from "./LeaderboardTable";

export default function UserTable({ users }: { users: any }) {
    const tableHeader = ["Rank", "Address", "Active Boost", "Wraith Points"];

    return (
        <LeaderboardTable headers={tableHeader}>
            <ListOfUsers users={users} />
        </LeaderboardTable>
    );
}
