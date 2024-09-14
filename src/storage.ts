import { URLSearchParamsInit } from "react-router-dom";

export const navLinks: {
    id: number;
    title: string;
    path: string;
}[] = [
    {
        id: 1,
        title: "Домашняя страница",
        path: "/",
    },
    {
        id: 2,
        title: "Работники",
        path: "/workers",
    },
    {
        id: 3,
        title: "Раздел",
        path: "/",
    },
    {
        id: 4,
        title: "Раздел",
        path: "/",
    },
    {
        id: 5,
        title: "Раздел",
        path: "/",
    },
];

export const imgBase64Part = "data:image/png;base64,";

export const contacts: {
    id: number;
    socialName: "email" | "telegram" | "rocketChat" | "phone";
}[] = [
    {
        id: 1,
        socialName: "email",
    },
    {
        id: 2,
        socialName: "telegram",
    },
    {
        id: 3,
        socialName: "rocketChat",
    },
    {
        id: 4,
        socialName: "phone",
    },
];

export const contactImg: {
    [key: string]: string;
} = {
    telegram: "telegram.svg",
    email: "email.svg",
    rocketChat: "rocketChat.svg",
    phone: "phone.svg",
};

export const contactHeading: {
    [key: string]: string;
} = {
    telegram: "Telegram",
    email: "Элеткропочта",
    rocketChat: "RocketChat",
    phone: "Телефон",
};

export const contactColor: {
    [key: string]: string;
} = {
    telegram: "gradient-to-r from-cyan-300 to-blue-200",
    email: "gradient-to-r from-orange-200 to-amber-500",
    rocketChat: "gradient-to-r from-red-200 to-red-400",
    phone: "gradient-to-r from-lime-300 to-green-500",
};

export const teamUnits: {
    id: number;
    teamUnit: "lead" | "deputy" | "subdivision" | "teamName";
}[] = [
    {
        id: 1,
        teamUnit: "lead",
    },
    {
        id: 2,
        teamUnit: "deputy",
    },
    {
        id: 3,
        teamUnit: "subdivision",
    },
    {
        id: 4,
        teamUnit: "teamName",
    },
];

export const teamUnitName: {
    [key: string]: string;
} = {
    lead: "Руководитель",
    deputy: "Заместитель",
    subdivision: "Подразделение",
    teamName: "Название команды",
};

export const defaultParams: URLSearchParamsInit = {
    edit: "false",
};

export const timeZones: string[] = [
    "UTC+3",
    "UTC+4",
    "UTC+5",
    "UTC+6",
    "UTC+7",
    "UTC+8",
    "UTC+9",
    "UTC+10",
    "UTC+11",
    "UTC+12",
    "UTC+13",
    "UTC-1",
    "UTC-2",
    "UTC-3",
    "UTC-4",
    "UTC-5",
    "UTC-6",
    "UTC-7",
    "UTC-8",
];

export const cities: string[] = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
];
