import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { createWorker, fen, getWorkerById } from "../../api/workers";
import { Await, useLoaderData } from "react-router-dom";
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

export const WorkerPage = () => {
    // const queryClient = useQueryClient();
    // const workerCreateMutation = useMutation({
    //     mutationFn: (worker: Worker) => {
    //         return createWorker(worker);
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["workers"] });
    //     },
    // });

    // const [imageBase64, setImageBase64] = useState<string>("");

    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     fetch("http://localhost:3000/workers", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ photo: imageBase64 }),
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(error => console.error(error));
    // };

    // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];

    //     if (file) {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             const imageBase64 = btoa(reader.result as string);
    //             setImageBase64(imageBase64);
    //         };

    //         reader.readAsBinaryString(file);
    //     }
    // };
    const { worker } = useLoaderData() as { worker: unknown };

    return (
        <main className="w-full flex flex-col gap-9 px-[var(--main-gor-pd)] py-[var(--main-ver-pd)]">
            <Suspense fallback={<WorkerInfoBlockSkeketon />}>
                <Await resolve={worker}>
                    {resolvedWorker => <WorkerInfoBlock worker={resolvedWorker} />}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerContactsBlockSkeleton />}>
                <Await resolve={worker}>
                    {resolvedWorker => <WorkerContactsBlock worker={resolvedWorker} />}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerTeamBlockSkeleton />}>
                <Await resolve={worker}>
                    {resolvedWorker => <WorkerTeamBlock worker={resolvedWorker} />}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerContactsBlockSkeleton />}>
                <Await resolve={worker}>
                    {resolvedWorker => <WorkerSkillsBlock worker={resolvedWorker} />}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerVacationBlockSkeleton />}>
                <Await resolve={worker}>
                    {resolvedWorker => <WorkerVacationBlock worker={resolvedWorker} />}
                </Await>
            </Suspense>
            <Suspense fallback={<WorkerHobbiesBlockSkeleton />}>
                <Await resolve={worker}>
                    {resolvedWorker => <WorkerHobbiesBlock worker={resolvedWorker} />}
                </Await>
            </Suspense>

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
