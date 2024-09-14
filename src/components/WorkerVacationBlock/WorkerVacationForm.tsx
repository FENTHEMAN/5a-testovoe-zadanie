import { SubmitHandler, useForm } from "react-hook-form";
import { Worker } from "../../types/workers.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorker } from "../../api/workers";
import * as yup from "yup";

export const WorkerVacationForm = ({
    setShow,
    worker,
}: {
    worker: Worker;
    setShow: (show: boolean) => void;
}) => {
    const schema = yup.object().shape({
        startDate: yup.string().required(),
        endDate: yup.string().required(),
        vacationName: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

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

    const onSubmit: SubmitHandler<{
        startDate: string;
        endDate: string;
        vacationName: string;
    }> = data => {
        workerUpdateMutation.mutate({
            vacations: [...worker.vacations!, { ...data }],
        });
        setValue("startDate", "");
        setValue("endDate", "");
        setValue("vacationName", "");
        setShow(false);
    };

    return (
        <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full z-20 backdrop-blur-sm bg-transparent">
            <button className="absolute top-5 right-5" onClick={() => setShow(false)}>
                <img className="w-10 h-10" src="/images/delete.svg" alt="" />
            </button>
            <form
                className="flex flex-col overflow-y-auto overflow-x-hidden max-h-full min-w-[25%] p-4 gap-8 rounded-3xl bg-white shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-3xl font-semibold">Новый отпуск</h1>
                <div className="flex flex-col gap-1">
                    <label>Дата начала отпуска</label>
                    <input
                        className={`p-3 rounded-xl border-[1px] border-[var(--color4)] outline-none ${
                            errors.startDate?.message && "border-red-500"
                        }`}
                        type="date"
                        {...register("startDate")}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Дата конца отпуска</label>
                    <input
                        className={`p-3 rounded-xl border-[1px] border-[var(--color4)] outline-none ${
                            errors.endDate?.message && "border-red-500"
                        }`}
                        type="date"
                        {...register("endDate")}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Причина отпуска</label>
                    <input
                        className={`p-3 rounded-xl border-[1px] border-[var(--color4)] outline-none ${
                            errors.vacationName?.message && "border-red-500"
                        }`}
                        type="text"
                        placeholder="Причина отпуска"
                        {...register("vacationName")}
                    />
                </div>
                <button
                    className="text-xl text-white shrink gap-3 py-[10px] px-5 rounded-xl bg-[color:var(--color0)]"
                    type="submit"
                >
                    Запланировать
                </button>
            </form>
        </div>
    );
};
