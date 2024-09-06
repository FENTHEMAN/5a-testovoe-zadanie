import { api } from "./api";

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

// const fen = {
//     name: "Fen",
//     contacts: {
//         email: "fen@fen.fen",
//         telegram: "@senusfen",
//         phone: "123456789",
//         rocketChat: "@fen",
//     },
//     workerTeam: {
//         lead: "lead",
//         deputy: "deputy",
//         subdivision: "subdivision",
//         teamName: "teamName",
//     },
//     skills: [
//         {
//             id: "1",
//             name: "React",
//         },
//         {
//             id: "2",
//             name: "TypeScript",
//         },
//         {
//             id: "3",
//             name: "Next JS",
//         },
//     ],
//     vacations: [
//         {
//             id: "1",
//             startDate: "2022-01-01",
//             endDate: "2022-01-15",
//             vacationName: "Летние Каникулы",
//         },
//     ],
// };
