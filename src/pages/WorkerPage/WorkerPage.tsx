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
    const [searchParams, setSearchParams] = useSearchParams(defaultParams);

    const isEdit = useIsEdit();

    console.log(isEdit);

    const deferWorkerData = useLoaderData() as { worker: Worker; workerId: string };

    return (
        <main className="w-full flex flex-col gap-9 px-[var(--main-gor-pd)] py-[var(--main-ver-pd)]">
            <Suspense fallback={<WorkerInfoBlockSkeketon />}>
                <Await resolve={deferWorkerData}>
                    {resolvedDeferWorkerData => {
                        return (
                            <WorkerInfoBlock
                                workerId={resolvedDeferWorkerData.workerId}
                            />
                        );
                    }}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerContactsBlockSkeleton />}>
                <Await resolve={deferWorkerData}>
                    {resolvedDeferWorkerData => (
                        <WorkerContactsBlock
                            workerId={resolvedDeferWorkerData.workerId}
                        />
                    )}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerTeamBlockSkeleton />}>
                <Await resolve={deferWorkerData}>
                    {resolvedDeferWorkerData => (
                        <WorkerTeamBlock workerId={resolvedDeferWorkerData.workerId} />
                    )}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerSkillsBlockSkeleton />}>
                <Await resolve={deferWorkerData}>
                    {resolvedDeferWorkerData => (
                        <WorkerSkillsBlock workerId={resolvedDeferWorkerData.workerId} />
                    )}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerVacationBlockSkeleton />}>
                <Await resolve={deferWorkerData}>
                    {resolvedDeferWorkerData => (
                        <WorkerVacationBlock
                            workerId={resolvedDeferWorkerData.workerId}
                        />
                    )}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerHobbiesBlockSkeleton />}>
                <Await resolve={deferWorkerData}>
                    {resolvedDeferWorkerData => (
                        <WorkerHobbiesBlock workerId={resolvedDeferWorkerData.workerId} />
                    )}
                </Await>
            </Suspense>
            <button
                className="text-xl py-[10px] px-5 rounded-xl bg-[color:var(--color5)]"
                onClick={() => {
                    window.scrollTo(0, 0);
                    setSearchParams(isEdit ? { edit: "false" } : { edit: "true" });
                }}
            >
                {searchParams.get("edit") == "true"
                    ? "Закончить редактирование"
                    : "Отредактировать профиль"}
            </button>
            {/* {isPending && <h1>Loading...</h1>}
            {error && <h1>{error.message}</h1>} */}
            {/* {data && <img src={imgBase64Part + data.photo} alt="" />} */}

            {/* <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="image"
                    id="file"
                    accept=".jpg, .png, .jpeg"
                    onChange={handleFileChange}
                />
                <button>Send</button>
            </form> */}
            {/* <button onClick={() => workerCreateMutation.mutate(fen)}>Create</button> */}
        </main>
    );
};
