import { useQuery } from "@tanstack/react-query";
import { getWorkers } from "../api/workers";

export const useWorkers = () => {
    return useQuery({
        queryKey: ["workers"],
        queryFn: () => getWorkers(),
    });
};
