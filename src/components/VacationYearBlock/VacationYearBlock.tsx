import { Vacation } from "../../types/workers.types";
import { VacationItem } from "../VacationItem/VacationItem";

export const VacationYearBlock = ({
    vacations,
    year,
}: {
    year: number;
    vacations: Vacation[];
}) => {
    return (
        <section className="flex-auto flex flex-col gap-3 h-min p-4 rounded-xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
            <h1 className="text-3xl font-semibold">{year}</h1>
            {vacations.length > 0 ? (
                <ul className="flex flex-col gap-5">
                    {vacations.map((vac, i) => (
                        <VacationItem vacation={vac} key={i} />
                    ))}
                </ul>
            ) : (
                <p className="text-lg">На этот год, пока отпусков не запланировано</p>
            )}
        </section>
    );
};
