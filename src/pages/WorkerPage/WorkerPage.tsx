import { Suspense } from "react";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { WorkerInfoBlock } from "../../components/WorkerInfoBlock/WorkerInfoBlock";
import { WorkerContactsBlock } from "../../components/WorkerContactsBlock/WorkerContactsBlock";
import { WorkerTeamBlock } from "../../components/WorkerTeamBlock/WorkerTeamBlock";
import { WorkerSkillsBlock } from "../../components/WorkerSkillsBlock/WorkerSkillsBlock";
import { WorkerVacationBlock } from "../../components/WorkerVacationBlock/WorkerVacationBlock";
import { WorkerHobbiesBlock } from "../../components/WorkerHobbiesBlock/WorkerHobbiesBlock";
import { WorkerVacationBlockSkeleton } from "../../components/WorkerVacationBlock/WorkerVacationBlockSkeleton";
import { WorkerInfoBlockSkeketon } from "../../components/WorkerInfoBlock/WorkerInfoBlockSkeketon";
import { WorkerContactsBlockSkeleton } from "../../components/WorkerContactsBlock/WorkerContactsBlockSkeleton";
import { WorkerTeamBlockSkeleton } from "../../components/WorkerTeamBlock/WorkerTeamBlockSkeleton";
import { WorkerHobbiesBlockSkeleton } from "../../components/WorkerHobbiesBlock/WorkerHobbiesBlockSkeleton";
import { defaultParams } from "../../storage";
import { Worker } from "../../types/workers.types";
import { WorkerSkillsBlockSkeleton } from "../../components/WorkerSkillsBlock/WorkerSkillsBlockSkeleton";
import { useIsEdit } from "../../hooks/useIsEdit";

export const WorkerPage = () => {
    const [, setSearchParams] = useSearchParams(defaultParams);

    const isEdit = useIsEdit();

    const deferWorkerData = useLoaderData() as { worker: Worker; workerId: string };

    return (
        <main className="w-full flex flex-col gap-9 px-[var(--main-gor-pd)] py-[var(--main-ver-pd)]">
            <Suspense
                fallback={
                    <>
                        <WorkerInfoBlockSkeketon />
                        <WorkerContactsBlockSkeleton />
                        <WorkerTeamBlockSkeleton />
                        <WorkerSkillsBlockSkeleton />
                        <WorkerVacationBlockSkeleton />
                        <WorkerHobbiesBlockSkeleton />
                    </>
                }
            >
                <Await resolve={deferWorkerData}>
                    {resolvedDeferWorkerData => {
                        return (
                            <>
                                <WorkerInfoBlock
                                    workerId={resolvedDeferWorkerData.workerId}
                                />
                                <WorkerContactsBlock
                                    workerId={resolvedDeferWorkerData.workerId}
                                />
                                <WorkerTeamBlock
                                    workerId={resolvedDeferWorkerData.workerId}
                                />
                                <WorkerSkillsBlock
                                    workerId={resolvedDeferWorkerData.workerId}
                                />
                                <WorkerVacationBlock
                                    workerId={resolvedDeferWorkerData.workerId}
                                />
                                <WorkerHobbiesBlock
                                    workerId={resolvedDeferWorkerData.workerId}
                                />
                            </>
                        );
                    }}
                </Await>
            </Suspense>
            <button
                className="text-xl py-[10px] px-5 rounded-xl bg-[color:var(--color5)]"
                onClick={() => {
                    window.scrollTo(0, 0);
                    setSearchParams(isEdit ? { edit: "false" } : { edit: "true" });
                }}
            >
                {isEdit ? "Закончить редактирование" : "Отредактировать профиль"}
            </button>
        </main>
    );
};
