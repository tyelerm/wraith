import css from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditUser from "./edit/EditUser";
import { randomUsers } from "./functions";
import { cn } from "@/lib/utils";

export default function ListOfUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let rank = 1;
        let _users = randomUsers(8)
            .sort((a: any, b: any) => b.wraith_points - a.wraith_points)
            .map((user: any) => (user = { ...user, rank: rank++ }));
        setUsers(_users);
    }, []);

    return (
        <div className="mx-2 bg-white rounded-sm dark:bg-inherit">
            {users.map((user: any, index: number) => {
                return (
                    <div
                        className="flex p-3 font-normal align-middle rounded-sm "
                        key={index + user.address}
                    >
                        <div className={css.rankCol}>{user.rank}</div>
                        <div className={cn(css.addressCol, css.address)}>
                            {user.address}
                        </div>
                        <div className={css.boostCol}>{user.active_boost}</div>
                        <div className={css.pointsCol}>
                            {user.wraith_points.toLocaleString()}
                        </div>
                        {/* <div className="flex items-center gap-2">
                                <Button variant="outline">
                                    <TrashIcon />
                                    Delete
                                </Button>
                                <EditUser />
                            </div> */}
                    </div>
                );
            })}
        </div>
    );
}
