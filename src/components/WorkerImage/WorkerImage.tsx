import { ChangeEvent } from "react";
import { imgBase64Part } from "../../storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorker } from "../../api/workers";
import { useParams } from "react-router-dom";
import { Worker } from "../../types/workers.types";

export const WorkerPhoto = ({
    binaryString,
    isFree,
    isEdit = false,
}: {
    binaryString: string;
    isFree: boolean;
    isEdit?: boolean;
}) => {
    const { workerId } = useParams();
    const queryClient = useQueryClient();
    const workerUpdateMutation = useMutation({
        mutationFn: (worker: Worker) => {
            return updateWorker(workerId!, worker);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workers"] });
            queryClient.invalidateQueries({ queryKey: ["worker", workerId] });
        },
    });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const imageBase64 = btoa(reader.result as string);
                workerUpdateMutation.mutate({ photo: imageBase64 });
            };

            reader.readAsBinaryString(file);
        }
    };

    return (
        <div className="relative w-32 h-32 shrink-0 rounded-full shadow-[0px_0px_5px_2px_rgba(0,0,0,0.2)] border-[4.5px] border-white border-solid">
            {isFree && (
                <div className="absolute -right-1 -top-1 bg-[color:var(--color2)] w-8 h-8 rounded-full border-[5px]  border-white" />
            )}
            <div className="relative w-full h-full flex items-center justify-center shadow-[inset_0px_0px_3px_1px_rgba(0,0,0,0.1)] rounded-full">
                <input
                    className="absolute w-full h-full opacity-0"
                    disabled={!isEdit}
                    type="file"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.webp"
                />
                {binaryString !== "" ? (
                    <img
                        className="w-full h-full object-cover rounded-full"
                        src={imgBase64Part + binaryString}
                        alt="Oops..."
                    />
                ) : (
                    <p className="text-2xl">{"˶ˆ ᗜ ˆ˵"}</p>
                )}
            </div>
        </div>
    );
};
