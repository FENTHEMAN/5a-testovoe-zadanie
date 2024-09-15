import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cities, timeZones } from "../../storage";
import { useParams } from "react-router-dom";
import { Worker } from "../../types/workers.types";
import { useWorkerMutationUpdate } from "../../hooks/useUpdateWorker";

export const WorkerMainInfoForm = ({ worker }: { worker: Worker }) => {
    const schema = yup
        .object({
            name: yup.string().required("Поле обязательно для заполнения"),
            birthDate: yup.string().required("Поле обязательно для заполнения"),
            city: yup.string().required("Поле обязательно для заполнения"),
            isFree: yup.boolean().required("Поле обязательно для заполнения"),
            timeZone: yup.string().required("Поле обязательно для заполнения"),
            post: yup.string().required("Поле обязательно для заполнения"),
        })
        .required();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            birthDate: worker.birthDate!,
            city: worker.city!,
            name: worker.name!,
            post: worker.post!,
            timeZone: worker.timeZone!,
            isFree: worker.isFree!,
        },
        resolver: yupResolver(schema),
    });

    const { workerId } = useParams();

    const workerUpdateMutation = useWorkerMutationUpdate(workerId!);

    const onSubmit: SubmitHandler<{
        name: string;
        birthDate: string;
        city: string;
        timeZone: string;
        post: string;
        isFree: boolean;
    }> = data => {
        workerUpdateMutation.mutate(data);
    };

    return (
        <form
            className="flex flex-1 flex-wrap gap-y-1 gap-x-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="basis-1/4 flex flex-col gap-1">
                <label className="text-gray-500">ФИО</label>
                <input
                    type="text"
                    defaultValue={worker.name}
                    placeholder="Заполните поле ФИО"
                    className={`p-[10px] rounded-lg border-[1px] bg-transparent border-[var(--color4)] outline-none cursor-pointer ${
                        errors.name?.message && "border-red-500"
                    }`}
                    {...register("name")}
                />
            </div>
            <div className="basis-1/4 flex flex-col gap-1">
                <label className="text-gray-500">Должность</label>
                <input
                    type="text"
                    placeholder="Заполните поле Должность"
                    className={`p-[10px] rounded-lg border-[1px] bg-transparent border-[var(--color4)] outline-none cursor-pointer ${
                        errors.post?.message && "border-red-500"
                    }`}
                    {...register("post")}
                />
            </div>
            <div className="basis-1/4 flex flex-col gap-1">
                <label className="text-gray-500">Занятость</label>
                <label
                    className="p-[10px] rounded-lg border-[1px] font-normal bg-transparent border-[var(--color4)] cursor-pointer"
                    htmlFor="isFree"
                >
                    {watch("isFree") ? "Свободен" : "Занят"}
                </label>
                <input
                    className="absolute -z-1 opacity-0"
                    type="checkbox"
                    id="isFree"
                    {...register("isFree")}
                />
            </div>
            <div className="basis-1/4 flex flex-col gap-1">
                <label className="text-gray-500">День рождения</label>
                <input
                    className={`p-[10px] rounded-lg border-[1px] bg-transparent border-[var(--color4)] outline-none cursor-pointer ${
                        errors.birthDate?.message && "border-red-500"
                    }`}
                    type="date"
                    defaultValue={worker.birthDate}
                    {...register("birthDate")}
                />
            </div>
            <div className="basis-1/4 flex flex-col gap-1">
                <label className="text-gray-500">Город</label>
                <select
                    defaultValue={worker.city}
                    className={`p-[10px] rounded-lg border-[1px] bg-transparent border-[var(--color4)] outline-none cursor-pointer ${
                        errors.city?.message && "border-red-500"
                    }`}
                    {...register("city")}
                >
                    {cities.map(city => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            <div className="basis-1/4 flex flex-col gap-1">
                <label className="text-gray-500">Часовой пояс</label>
                <select
                    defaultValue={worker.timeZone}
                    className={`p-[10px] rounded-lg border-[1px] bg-transparent border-[var(--color4)] outline-none cursor-pointer ${
                        errors.timeZone?.message && "border-red-500"
                    }`}
                    {...register("timeZone")}
                >
                    {timeZones.map(timeZone => (
                        <option key={timeZone} value={timeZone}>
                            {timeZone}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex-auto flex flex-col gap-1">
                <p className="text-gray-500">Нажмите для сохранения</p>
                <button
                    className="p-[10px] rounded-lg border-[1px] border-transparent bg-[color:var(--color5)]"
                    type="submit"
                >
                    Сохранить
                </button>
            </div>
        </form>
    );
};
