import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../api/teams";

export const useTeams = () => {
    return useQuery({
        queryKey: ["teams"],
        queryFn: () => getTeams(),
    });
};
