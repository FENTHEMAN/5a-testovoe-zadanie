import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorker } from "../api/workers";
import { Worker } from "../types/workers.types";

export const useWorkerMutationUpdate = (workerId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (worker: Worker) => {
            return updateWorker(workerId!, worker);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workers"] });
            queryClient.invalidateQueries({ queryKey: ["worker", workerId] });
        },
    });
};
