import { cn } from "@/lib/utils";
import css from "./styles.module.css";
import { ReactNode } from "react";

const columnStyles = [css.rankCol, css.addressCol, css.boostCol, css.pointsCol];

export default function LeaderboardTable({
    children,
    headers,
}: {
    children: ReactNode;
    headers: string[];
}) {
    return (
        <div className="flex  max-w-[1400px] w-full overflow-y-auto border rounded-md border-zinc-200 dark:border-zinc-800 dark:bg-graident-dark">
            <div className="flex-grow w-auto py-5 space-y-5 bg-white rounded-md lg:w-full dark:bg-inherit">
                <div className="flex px-5 py-2 pb-5 border-b dark:border-zinc-600">
                    {headers.map((header, index) => {
                        return (
                            <h1
                                key={index}
                                className={cn(
                                    css.tableHead,
                                    columnStyles[index]
                                )}
                            >
                                {header}
                            </h1>
                        );
                    })}
                </div>

                {children}
            </div>
        </div>
    );
}
