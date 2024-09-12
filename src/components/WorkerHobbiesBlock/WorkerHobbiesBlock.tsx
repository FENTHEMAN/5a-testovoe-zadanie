import { useQuery } from "@tanstack/react-query";
import { Hobby } from "../Hobby/Hobby";
import { getWorkerById } from "../../api/workers";
import { WorkerHobbiesBlockSkeleton } from "./WorkerHobbiesBlockSkeleton";

export const WorkerHobbiesBlock = ({ workerId }: { workerId: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["worker", workerId],
        queryFn: () => getWorkerById(workerId),
    });
    if (isLoading) return <WorkerHobbiesBlockSkeleton />;
    return (
        <div className="w-full p-4 flex flex-col gap-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
            <h1 className="text-4xl font-semibold">Хобби</h1>
            <ul className="flex gap-5 flex-wrap">
                {data!.hobbies!.map((hobby, i) => (
                    <Hobby key={i} hobbyName={hobby.name} />
                ))}
            </ul>
        </div>
    );
};
