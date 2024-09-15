import { useParams } from "react-router-dom";
import { Worker } from "../../types/workers.types";
import { useState } from "react";
import { useWorkerMutationUpdate } from "../../hooks/useUpdateWorker";

export const WorkerHobbiesEdit = ({ worker }: { worker: Worker }) => {
    const { workerId } = useParams();

    const workerUpdateMutation = useWorkerMutationUpdate(workerId!);

    const handleClickAdd = () => {
        if (!input) return;
        workerUpdateMutation.mutate({
            hobbies: [
                ...worker.hobbies!,
                ...input
                    .trim()
                    .split(",")
                    .filter(i => i !== "")
                    .map(i => ({ name: i })),
            ],
        });
        setInput("");
    };
    const handleClickDelete = (name: string) => {
        workerUpdateMutation.mutate({
            hobbies: worker.hobbies?.filter(hobby => hobby.name !== name),
        });
    };

    const [input, setInput] = useState<string>("");

    return (
        <div className="w-full flex flex-col gap-1">
            <label className="text-gray-500">Добавить хобби</label>
            <input
                className="p-3 rounded-xl w-1/3 border-2 border-[var(--color4)] outline-none"
                value={input}
                placeholder="Впишите хобби через запитую"
                onChange={e => setInput(e.target.value)}
                type="text"
            />
            <ul className="flex gap-5 flex-wrap mt-4">
                {worker.hobbies?.map(({ name }, i) => (
                    <li
                        className="flex items-center gap-3 py-[10px] px-5 rounded-xl bg-[color:var(--color5)]"
                        key={i}
                    >
                        <p className="text-xl">{name}</p>
                        <button onClick={() => handleClickDelete(name)}>
                            <img className="w-5 h-5" src="/images/delete.svg" alt="-" />
                        </button>
                    </li>
                ))}
                <button
                    className="flex gap-3 items-center py-[10px] px-5 rounded-xl border-[1px] border-[color:var(--color5)]"
                    onClick={handleClickAdd}
                >
                    <img src="/images/plus.svg" alt="+" />
                    <p className="text-xl">Добавить хобби</p>
                </button>
            </ul>
        </div>
    );
};
