import { useQuery } from "@tanstack/react-query";
import { getWorkerById } from "../api/workers";

export const useWorker = (workerId: string) => {
    return useQuery({
        queryKey: ["worker", workerId],
        queryFn: () => getWorkerById(workerId),
    });
};
