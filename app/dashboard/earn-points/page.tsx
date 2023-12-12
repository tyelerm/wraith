import css from "./styles.module.css";
import PointTask from "./components/point-task";
import { cn } from "@/lib/utils";

export default function EarnPoints() {
    return (
        <div className="h-full contents">
            <h1 className="pt-2 pl-4 text-3xl font-bold">Earn Points</h1>
            <div className="flex flex-wrap content-start h-full grid-cols-2 gap-3 overflow-y-auto">
                <div className={cn(css.taskGrid, "px-[2px] py-4 md:p-4")}>
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                    <PointTask />
                </div>
            </div>
        </div>
    );
}
