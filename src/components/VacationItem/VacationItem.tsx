import { Vacation } from "../../types/workers.types";
import {
    datesDaysDiff,
    datesStatus,
    endingDate,
    startingDate,
    timeUntilDates,
} from "../../utils/datesCalculating";

export const VacationItem = ({ vacation }: { vacation: Vacation }) => {
    const date = timeUntilDates(vacation.startDate, vacation.endDate);

    return (
        <div
            className={`w-full flex-wrap flex justify-between py-[10px] px-5 rounded-xl ${
                datesStatus(vacation.startDate, vacation.endDate) === "iscoming"
                    ? "bg-[color:var(--color5)]"
                    : "bg-[color:var(--color4)]"
            }`}
        >
            <div className="flex gap-1">
                <p className="text-lg">{startingDate(vacation.startDate)}</p>
                <p className="text-lg">{endingDate(vacation.endDate)}</p>
                <p className="text-lg">
                    {datesDaysDiff(vacation.startDate, vacation.endDate)} дн.
                </p>
            </div>
            <p
                className={`${
                    datesStatus(vacation.startDate, vacation.endDate) === "iscoming" &&
                    "font-semibold"
                } text-lg`}
            >
                {datesStatus(vacation.startDate, vacation.endDate) === "iscoming"
                    ? "идет"
                    : "через " +
                      (date.months !== 0 ? date.months + " мес. " : "") +
                      date.days +
                      " дн."}
            </p>
        </div>
    );
};
