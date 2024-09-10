import { teamUnitName, teamUnits } from "../../storage";
import { Worker } from "../../types/workers.types";
import { TeamUnit } from "../TeamUnit/TeamUnit";

export const WorkerTeamBlock = ({ worker }: { worker: Worker }) => {
    return (
        <div className="w-full p-4 flex flex-col gap-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
            <h1 className="text-4xl font-semibold">Моя команда</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teamUnits.map(unit => (
                    <TeamUnit
                        key={unit.id}
                        link={worker.workerTeam[unit.teamUnit].link}
                        name={worker.workerTeam[unit.teamUnit].name}
                        unitNaming={teamUnitName[unit.teamUnit]}
                    />
                ))}
            </ul>
        </div>
    );
};
