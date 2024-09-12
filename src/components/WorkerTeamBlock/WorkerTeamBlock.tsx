import { useQuery } from "@tanstack/react-query";
import { teamUnitName, teamUnits } from "../../storage";
import { TeamUnit } from "../TeamUnit/TeamUnit";
import { getWorkerById } from "../../api/workers";
import { WorkerTeamBlockSkeleton } from "./WorkerTeamBlockSkeleton";

export const WorkerTeamBlock = ({ workerId }: { workerId: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["worker", workerId],
        queryFn: () => getWorkerById(workerId),
    });
    if (isLoading) return <WorkerTeamBlockSkeleton />;
    else
        return (
            <div className="w-full p-4 flex flex-col gap-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
                <h1 className="text-4xl font-semibold">Моя команда</h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {teamUnits.map(unit => (
                        <TeamUnit
                            key={unit.id}
                            link={data!.workerTeam![unit.teamUnit].link}
                            name={data!.workerTeam![unit.teamUnit].name}
                            unitNaming={teamUnitName[unit.teamUnit]}
                        />
                    ))}
                </ul>
            </div>
        );
};
