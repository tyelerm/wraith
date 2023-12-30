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
        <div className="flex  max-w-[1400px] w-full overflow-y-auto border rounded-md border-indigo-900  bg-[#0e081d]   dark:bg-graident-dark">
            <div className="flex-grow w-auto py-5 space-y-5 text-indigo-200 rounded-md lg:w-full bg-inherit">
                <div className="flex px-5 py-2 pb-5 border-b border-indigo-900">
                    {headers.map((header, index) => {
                        return (
                            <h1
                                key={index}
                                className={cn(
                                    css.tableHead,
                                    columnStyles[index],
                                    "  text-indigo-300 "
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
