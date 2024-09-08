import { VacationStatus } from "../types/vacationsCalculating.types";

export const datesDaysDiff = (startDate: string, endDate: string): number => {
    const differenceInTime = Math.abs(
        Number(new Date(startDate)) - Number(new Date(endDate))
    );
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

    return differenceInDays;
};

export const datesYears = (startDate: string, endDate: string): [number, number] => {
    return [new Date(startDate).getFullYear(), new Date(endDate).getFullYear()];
};

export const datesStatus = (startDate: string, endDate: string): VacationStatus => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < now) {
        return "isover";
    } else if (start <= now && now <= end) {
        return "iscoming";
    } else {
        return "willbe";
    }
};

export const timeUntilDates = (
    startDate: string,
    endDate: string
): {
    days: number;
    hours: number;
} => {
    if (datesStatus(startDate, endDate) === "willbe") {
        const now = new Date().getTime();
        const start = new Date(startDate).getTime();

        const timeDiff = start - now;
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return {
            days,
            hours,
        };
    } else {
        return {
            days: 0,
            hours: 0,
        };
    }
};

export const prettyDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
};
