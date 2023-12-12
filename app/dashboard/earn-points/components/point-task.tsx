export default function PointTask() {
    return (
        <div className="flex flex-col p-4 border border-indigo-500 rounded-md bg-[#0e081d] max-w-[500px] h-[275px] w-full">
            <div className="text-primary text-[1.8rem] font-medium">
                Point Task
            </div>
            <div className="h-full overflow-auto text-gray-400">
                Task Description: this is what you have to do to complete the
                task and earn wraith points. Task Description: this is what you
                have to do to complete the task and earn wraith points. Task
                Description: this is what you have to do to complete the task
                and earn wraith points. Task Description: this is what you have
                to do to complete the task and earn wraith points. Task
                Description: this is what you have to do to complete the task
                and earn wraith points. Task Description: this is what you have
                to do to complete the task and earn wraith points.
            </div>
            <div className="flex justify-between mt-3">
                <div className="px-2 py-[2px] text-indigo-500 uppercase bg-[#2b1952] border border-indigo-500 rounded-sm">
                    10 points
                </div>
                <div className="px-2 py-[2px] text-white uppercase bg-gray-600 border border-white rounded-sm">
                    hourly
                </div>
            </div>
        </div>
    );
}
