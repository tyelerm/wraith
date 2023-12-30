import { Input } from "@/components/ui/input";
import React from "react";

export default function SearchUsers({ setSearch }: { setSearch: any }) {
    const handleInputChange = (e: any) => {
        setSearch(e.target.value);
    };

    return (
        <Input
            onChange={(e) => handleInputChange(e)}
            placeholder="search by address, name"
            className="bg-white ring-zinc-300 dark:bg-inherit focus:dark:ring-zinc-700 focus:ring-zinc-300"
        />
    );
}
