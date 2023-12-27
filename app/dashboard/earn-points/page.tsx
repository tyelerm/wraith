import css from "./styles.module.css";
import PointTask from "./components/point-task";
import { cn } from "@/lib/utils";
import tasks from "./example-tasks.json";

export const metadata = {
    title: "Tasks",
};

export default function EarnPoints() {
    return (
        <div className="h-full contents">
            <h1 className="text-3xl font-bold">Earn Points</h1>
            <div className="flex flex-wrap content-start h-full grid-cols-2 gap-3 overflow-y-auto">
                <div className={cn(css.taskGrid, "pr-2 md:pr-4 pb-4")}>
                    {Object.values(tasks).map((task, index) => {
                        return <PointTask key={index} task={task} />;
                    })}
                </div>
            </div>
        </div>
    );
}
