import { useQuery } from "@tanstack/react-query";
import { vacationsSorting } from "../../utils/vacationsSorting";
import { VacationYearBlock } from "../VacationYearBlock/VacationYearBlock";
import { getWorkerById } from "../../api/workers";
import { WorkerVacationBlockSkeleton } from "./WorkerVacationBlockSkeleton";
import { useIsEdit } from "../../hooks/useIsEdit";
import { useState } from "react";
import { WorkerVacationForm } from "./WorkerVacationForm";

export const WorkerVacationBlock = ({ workerId }: { workerId: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["worker", workerId],
        queryFn: () => getWorkerById(workerId),
    });

    const isEdit = useIsEdit();
    const [showForm, setShowForm] = useState<boolean>(false);

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
            {isEdit && (
                <button
                    className="text-xl text-white max-w-72 shrink gap-3 py-[10px] px-5 rounded-xl bg-[color:var(--color0)]"
                    onClick={() => setShowForm(true)}
                >
                    Запланировать отпуск
                </button>
            )}
            {showForm && isEdit && (
                <WorkerVacationForm setShow={setShowForm} worker={data!} />
            )}
        </div>
    );
};
