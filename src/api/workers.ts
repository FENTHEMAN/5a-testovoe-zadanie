import { api } from "./api";
import { Worker } from "../types/workers.types";

const URL = "http://localhost:3000/workers";

export const getWorkers = async (): Promise<Worker[] | undefined> => {
    try {
        const workers = await api("GET", URL);
        return workers as Worker[];
    } catch (e) {
        const error = e as Error;
        throw new Error(error.message);
    }
};

export const getWorkerById = async (id: string): Promise<Worker | undefined> => {
    try {
        const worker = await api("GET", `${URL}/${id}`);
        return worker as Worker;
    } catch (e) {
        const error = e as Error;
        throw new Error(error.message);
    }
};

export const updateWorker = async (
    id: string,
    worker: Worker
): Promise<Worker | undefined> => {
    try {
        const updatedWorker = await api("PUT", `${URL}/${id}`, worker);
        return updatedWorker as Worker;
    } catch (e) {
        const error = e as Error;
        throw new Error(error.message);
    }
};

export const createWorker = async (worker: Worker): Promise<Worker> => {
    try {
        const createdWorker = await api("POST", URL, worker);
        return createdWorker as Worker;
    } catch (e) {
        const error = e as Error;
        throw new Error(error.message);
    }
};

export const deleteWorker = async (id: string): Promise<Worker> => {
    try {
        const deletedWorker = await api("DELETE", `${URL}/${id}`);
        return deletedWorker as Worker;
    } catch (e) {
        const error = e as Error;
        throw new Error(error.message);
    }
};

export const fen: Worker = {
    birthDate: "2007-02-14",
    city: "Novosib",
    isFree: true,
    hobbies: [
        {
            name: "Heartstone",
        },
        {
            name: "Pubg Mobile",
        },
        {
            name: "Magic the Gathering",
        },
    ],
    inTeamDate: "2024-09-14",
    post: "Frontend Developer",
    timeZone: "GMT+7",
    name: "Fen",
    photo: "",
    description: "Description",
    contacts: {
        email: "fen@fen.fen",
        telegram: "@senusfen",
        phone: "123456789",
        rocketChat: "@fen",
    },
    workerTeam: {
        deputy: {
            link: "/workers/4183",
            name: "Михал Михалыч",
        },
        lead: {
            link: "/workers/4183",
            name: "Сан Саныч",
        },
        subdivision: {
            link: "/workers",
            name: "Фронтенд разработка",
        },
        teamName: {
            link: "/workers",
            name: "Отдел разработки web3 продуктов",
        },
    },
    skills: [
        {
            name: "React",
        },
        {
            name: "TypeScript",
        },
        {
            name: "Next JS",
        },
    ],
    vacations: [
        {
            startDate: "2022-01-01",
            endDate: "2022-01-15",
            vacationName: "Летние Каникулы",
        },
    ],
};
