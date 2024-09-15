import { teamUnitName, teamUnits } from "../../storage";
import { TeamUnit } from "../TeamUnit/TeamUnit";
import { WorkerTeamBlockSkeleton } from "./WorkerTeamBlockSkeleton";
import { WorkerTeamForm } from "./WorkerTeamForm";
import { useIsEdit } from "../../hooks/useIsEdit";
import { useWorker } from "../../hooks/useWorker";

export const WorkerTeamBlock = ({ workerId }: { workerId: string }) => {
    const { data, isLoading } = useWorker(workerId);

    const isEdit = useIsEdit();

    if (isLoading) return <WorkerTeamBlockSkeleton />;
    else
        return (
            <div className="w-full p-4 flex flex-col gap-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
                <h1 className="text-4xl font-semibold">Моя команда</h1>
                {isEdit ? (
                    <WorkerTeamForm worker={data!} />
                ) : (
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
                )}
            </div>
        );
};
