import { Worker } from "../../types/workers.types";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useWorkerMutationUpdate } from "../../hooks/useUpdateWorker";

export const WorkerInfoDescription = ({ worker }: { worker: Worker }) => {
    const { workerId } = useParams();

    const workerUpdateMutation = useWorkerMutationUpdate(workerId!);

    const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget as HTMLTextAreaElement;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight + 6}px`;
    };

    const [height, setHeight] = useState(0);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current?.scrollHeight && textareaRef.current?.scrollHeight > 0) {
            setHeight(textareaRef.current.scrollHeight);
        }
    }, [height]);

    return (
        <div className="w-full flex flex-col gap-2">
            <textarea
                rows={1}
                ref={textareaRef}
                style={{
                    height: `${height}px`,
                }}
                className={`w-full overflow-hidden h-auto p-3 text-xl resize-none rounded-xl border-2 border-[var(--color4)] outline-none`}
                defaultValue={worker.description}
                onInput={handleInput}
                onBlur={e => {
                    workerUpdateMutation.mutate({
                        description: e.currentTarget.value,
                    });
                }}
            />
            <div>
                <p className="mb-1">В команде с</p>
                <input
                    className={`w-full cursor-pointer p-3 rounded-xl border-2 border-[var(--color4)] outline-none`}
                    type="date"
                    defaultValue={worker.inTeamDate}
                    onChange={e =>
                        workerUpdateMutation.mutate({
                            timeZone: e.currentTarget.value,
                        })
                    }
                />
            </div>
        </div>
    );
};
