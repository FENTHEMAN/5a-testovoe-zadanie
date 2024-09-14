import { Team } from "../types/teams.types";
import { api } from "./api";

const URL = "http://localhost:3000/teams";

export const getTeams = async (): Promise<Team[] | undefined> => {
    try {
        const teams = await api("GET", URL);
        return teams as Team[];
    } catch (e) {
        const error = e as Error;
        throw new Error(error.message);
    }
};

export const getTeamById = async (id: string): Promise<Team | undefined> => {
    try {
        const team = await api("GET", `${URL}/${id}`);
        return team as Team;
    } catch (e) {
        const error = e as Error;
        throw new Error(error.message);
    }
};
