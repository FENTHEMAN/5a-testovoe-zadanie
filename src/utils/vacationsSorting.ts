import { Vacation } from "../types/workers.types";
import { datesStatus } from "./datesCalculating";

export const vacationsSorting = (vacs: Vacation[]) => {
    const grouped: {
        [key: number]: Vacation[];
    } = {};

    vacs.forEach(vac => {
        if (datesStatus(vac.startDate, vac.endDate) !== "isover") {
            const startYear = +vac.startDate.split("-")[0];
            const endYear = +vac.endDate.split("-")[0];

            if (!grouped[startYear]) {
                grouped[startYear] = [];
            }
            if (!grouped[endYear]) {
                grouped[endYear] = [];
            }
            if (endYear - startYear > 1) {
                for (let i = startYear + 1; i < endYear; i++) {
                    grouped[i] = [];
                    grouped[i].push(vac);
                }
            }
            if (!grouped[startYear].includes(vac)) {
                grouped[startYear].push(vac);
            }
            if (!grouped[endYear].includes(vac)) {
                grouped[endYear].push(vac);
            }
        }
    });

    if (Object.keys(grouped).length < 3) {
        if (
            Object.keys(grouped).length === 2 &&
            +Object.keys(grouped).sort()[0] - +Object.keys(grouped).sort()[1] < -1
        ) {
            for (
                let i = +Object.keys(grouped).sort()[0] + 1;
                i < +Object.keys(grouped).sort()[1];
                i++
            ) {
                grouped[i] = [];
            }
        }

        for (
            let i = Math.max(...Object.keys(grouped).map(Number)) + 1;
            Object.keys(grouped).length !== 3;
            i++
        ) {
            grouped[i] = [];
        }
    }

    return Object.keys(grouped).map(year => ({
        year: +year,
        vacations: grouped[+year].sort(
            (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        ),
    }));
};
