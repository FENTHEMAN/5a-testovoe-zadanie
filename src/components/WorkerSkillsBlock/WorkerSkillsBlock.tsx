import { useQuery } from "@tanstack/react-query";
import { Skill } from "../Skill/Skill";
import { WorkerSkillsBlockSkeleton } from "./WorkerSkillsBlockSkeleton";
import { getWorkerById } from "../../api/workers";
import { WorkerSkillsEdit } from "./WorkerSkillsEdit";
import { useIsEdit } from "../../hooks/useIsEdit";

export const WorkerSkillsBlock = ({ workerId }: { workerId: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["worker", workerId],
        queryFn: () => getWorkerById(workerId),
    });
    const isEdit = useIsEdit();

    if (isLoading) return <WorkerSkillsBlockSkeleton />;
    else
        return (
            <div className="w-full p-4 flex flex-col gap-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
                <h1 className="text-4xl font-semibold">Мои навыки</h1>
                {isEdit ? (
                    <WorkerSkillsEdit worker={data!} />
                ) : (
                    <ul className="flex gap-5 flex-wrap">
                        {data!.skills!.map((skill, i) => (
                            <Skill key={i} skillName={skill.name} />
                        ))}
                    </ul>
                )}
            </div>
        );
};
