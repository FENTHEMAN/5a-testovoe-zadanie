import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { createWorker, fen, getWorkerById } from "../../api/workers";
import { useParams } from "react-router-dom";
import { Worker } from "../../types/workers.types";
import { WorkerInfoBlock } from "../../components/WorkerInfoBlock/WorkerInfoBlock";
import { WorkerContactsBlock } from "../../components/WorkerContactsBlock/WorkerContactsBlock";

export const WorkerPage = () => {
    const { workerId } = useParams();
    const { data, error, isPending } = useQuery({
        queryKey: ["worker", workerId],
        queryFn: () => {
            if (typeof workerId === "string") {
                return getWorkerById(workerId);
            }
        },
    });

    const queryClient = useQueryClient();

    const workerCreateMutation = useMutation({
        mutationFn: (worker: Worker) => {
            return createWorker(worker);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workers"] });
        },
    });

    const [imageBase64, setImageBase64] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch("http://localhost:3000/workers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ photo: imageBase64 }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const imageBase64 = btoa(reader.result as string);
                setImageBase64(imageBase64);
            };

            reader.readAsBinaryString(file);
        }
    };

    return (
        <main className="w-full flex flex-col gap-11 px-[var(--main-gor-pd)] py-[var(--main-ver-pd)]">
            {data && (
                <>
                    <WorkerInfoBlock worker={data} isLoading={isPending} />
                    <WorkerContactsBlock worker={data} isLoading={isPending} />
                </>
            )}

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
            <button onClick={() => workerCreateMutation.mutate(fen)}>Create</button>
        </main>
    );
};
