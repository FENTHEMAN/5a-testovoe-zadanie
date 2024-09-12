import { useQuery } from "@tanstack/react-query";
import { vacationsSorting } from "../../utils/vacationsSorting";
import { VacationYearBlock } from "../VacationYearBlock/VacationYearBlock";
import { getWorkerById } from "../../api/workers";
import { WorkerVacationBlockSkeleton } from "./WorkerVacationBlockSkeleton";

export const WorkerVacationBlock = ({ workerId }: { workerId: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["worker", workerId],
        queryFn: () => getWorkerById(workerId),
    });
    if (isLoading) return <WorkerVacationBlockSkeleton />;
    return (
        <div className="w-full p-4 flex flex-col gap-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
            <h1 className="text-4xl font-semibold">Оптуска</h1>
            <ul className="flex gap-6 flex-wrap">
                {data!.vacations!.length > 0 &&
                    vacationsSorting(data!.vacations!).map((vac, i) => (
                        <VacationYearBlock
                            vacations={vac.vacations}
                            year={vac.year}
                            key={i}
                        />
                    ))}
            </ul>
        </div>
    );
};
