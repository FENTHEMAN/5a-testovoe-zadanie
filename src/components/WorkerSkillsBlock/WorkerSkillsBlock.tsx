import { Worker } from "../../types/workers.types";
import { Skill } from "../Skill/Skill";

export const WorkerSkillsBlock = ({
    worker,
    isLoading,
}: {
    worker: Worker;
    isLoading: boolean;
}) => {
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="w-full p-4 flex flex-col gap-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
            <h1 className="text-4xl font-semibold">Мои навыки</h1>
            <ul className="flex gap-5 flex-wrap">
                {worker.skills.map((skill, i) => (
                    <Skill key={i} skillName={skill.name} />
                ))}
            </ul>
        </div>
    );
};
