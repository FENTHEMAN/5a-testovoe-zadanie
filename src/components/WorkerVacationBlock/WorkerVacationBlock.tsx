import { Worker } from "../../types/workers.types";
import { vacationsSorting } from "../../utils/vacationsSorting";
import { VacationYearBlock } from "../VacationYearBlock/VacationYearBlock";

export const WorkerVacationBlock = ({ worker }: { worker: Worker }) => {
    return (
        <div className="w-full p-4 flex flex-col gap-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
            <h1 className="text-4xl font-semibold">Оптуска</h1>
            <ul className="flex gap-6 flex-wrap">
                {vacationsSorting(worker.vacations).map((vac, i) => (
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
