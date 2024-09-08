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

export const contactColor: {
    [key: string]: string;
} = {
    telegram: "gradient-to-r from-cyan-300 to-blue-200",
    email: "gradient-to-r from-orange-200 to-amber-500",
    rocketChat: "gradient-to-r from-red-200 to-red-400",
    phone: "gradient-to-r from-lime-300 to-green-500",
};
