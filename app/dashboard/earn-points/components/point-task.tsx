const UNIT_MAP: { [key: string]: string } = {
    hour: "hourly",
    day: "daily",
    week: "weekly",
    month: "monthly",
};

export default function PointTask({ task }: { task: any }) {
    return (
        <div className="flex flex-col p-4 border border-indigo-500 rounded-md bg-[#0e081d] max-w-[500px] h-[275px] w-full">
            <div className="text-primary text-[1.8rem] font-medium">
                {task.name}
            </div>
            <div className="h-full overflow-auto text-gray-400">
                {task.description}
            </div>
            <div className="flex justify-between mt-3">
                <div className="px-2 py-[2px] text-indigo-500 uppercase bg-[#2b1952] border border-indigo-500 rounded-sm">
                    {task.points} points
                </div>
                <div className="px-2 py-[2px] text-white uppercase bg-gray-600 border border-white rounded-sm">
                    {task.duration > 1 ? (
                        <>{`Every ${task.duration} ${task.unit}s`}</>
                    ) : (
                        <>{UNIT_MAP[task.unit]}</>
                    )}
                </div>
            </div>
        </div>
    );
}
