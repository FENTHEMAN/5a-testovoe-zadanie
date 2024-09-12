import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cities, timeZones } from "../../storage";

export const WorkerMainInfoForm = () => {
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
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<{
        name: string;
        birthDate: string;
        city: string;
        timeZone: string;
        post: string;
        isFree: boolean;
    }> = data => console.log(data);

    return (
        <form className="flex flex-1 flex-wrap gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="basis-1/4 flex flex-col gap-2">
                <label className="text-gray-500">ФИО</label>
                <input
                    type="text"
                    placeholder="Заполните поле ФИО"
                    className={`p-3 rounded-xl border-2 bg-transparent border-[var(--color4)] text-lg outline-none ${
                        errors.name?.message && "border-red-500 border-1"
                    }`}
                    {...register("name")}
                />
            </div>
            <div className="basis-1/4 flex flex-col gap-2">
                <label>Должность</label>
                <input
                    type="text"
                    placeholder="Заполните поле Должность"
                    className={`p-3 rounded-xl border-2 bg-transparent border-[var(--color4)] text-lg outline-none ${
                        errors.post?.message && "border-red-500 border-1"
                    }`}
                    {...register("post")}
                />
            </div>
            <div className="basis-1/4 flex flex-col gap-2">
                <label>Занятость</label>
                <input type="checkbox" {...register("isFree")} />
            </div>
            <div className="basis-1/4 flex flex-col gap-2">
                <label>День рождения</label>
                <input
                    className={`p-3 rounded-xl border-2 bg-transparent border-[var(--color4)] text-lg outline-none ${
                        errors.birthDate?.message && "border-red-500 border-1"
                    }`}
                    type="date"
                    {...register("birthDate")}
                />
            </div>
            <div className="basis-1/4 flex flex-col gap-2">
                <label>Город</label>
                <select
                    className={`p-3 rounded-xl border-2 bg-transparent border-[var(--color4)] text-lg outline-none ${
                        errors.city?.message && "border-red-500 border-1"
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
            <div className="basis-1/4 flex flex-col gap-2">
                <label>Часовой пояс</label>
                <select
                    className={`p-3 rounded-xl border-2 bg-transparent border-[var(--color4)] text-lg outline-none ${
                        errors.timeZone?.message && "border-red-500 border-1"
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
            <button type="submit">Сохранить</button>
        </form>
    );
};
