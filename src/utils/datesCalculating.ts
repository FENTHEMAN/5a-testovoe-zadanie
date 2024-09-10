import { VacationStatus } from "../types/dateCalculating.types";

export const datesDaysDiff = (startDate: string, endDate: string): number => {
    const differenceInTime = Math.abs(
        Number(new Date(startDate)) - Number(new Date(endDate))
    );
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

    return differenceInDays;
};

export const datesYears = (
    startDate: string,
    endDate: string
): { startYear: number; endYear: number } => {
    return {
        startYear: new Date(startDate).getFullYear(),
        endYear: new Date(endDate).getFullYear(),
    };
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
    months: number;
} => {
    if (datesStatus(startDate, endDate) === "willbe") {
        const now = new Date().getTime();
        const start = new Date(startDate).getTime();

        const timeDiff = start - now;

        const differenceInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const months = Math.floor(differenceInDays / 30);
        const days = differenceInDays % 30;

        return {
            days,
            months,
        };
    } else {
        return {
            days: 0,
            months: 0,
        };
    }
};

export const prettyDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
};

const months: {
    [key: number]: string;
} = {
    1: "января",
    2: "февраля",
    3: "марта",
    4: "апреля",
    5: "мая",
    6: "июня",
    7: "июля",
    8: "августа",
    9: "сентября",
    10: "октября",
    11: "ноября",
    12: "декабря",
};

export const startingDate = (dateString: string): string => {
    const [, month, day] = dateString.split("-");

    return `c ${Number(day)} ${months[Number(month)]}`;
};

export const endingDate = (dateString: string): string => {
    const [, month, day] = dateString.split("-");

    return `до ${Number(day)} ${months[Number(month)]}`;
};
