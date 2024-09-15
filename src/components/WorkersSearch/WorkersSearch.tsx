import { useState } from "react";
import { useWorkers } from "../../hooks/useWorkers";
import { NavLink } from "react-router-dom";
import { WorkerPhoto } from "../WorkerPhoto/WorkerPhoto";
import { WorkersSearchSkeleton } from "./WorkersSearchSkeleton";

export const WorkersSearch = () => {
    const { data, isLoading } = useWorkers();

    const [search, setSearch] = useState("");

    if (isLoading) return <WorkersSearchSkeleton />;

    return (
        <section className="w-full flex flex-col gap-9">
            <div className="flex flex-col gap-2">
                <label>Поиск работников</label>
                <input
                    placeholder="Введите ФИО работника"
                    className="p-3 rounded-xl border-2 border-[var(--color4)] outline-none"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {data
                ?.filter(({ name }) =>
                    name!
                        .replace(/\s+/g, "")
                        .toLowerCase()
                        .includes(search.replace(/\s+/g, "").toLowerCase())
                )
                .map(({ id, name, photo, description, isFree }) => (
                    <NavLink className="flex gap-5" to={`/workers/${id}`} key={id}>
                        <WorkerPhoto binaryString={photo!} isFree={isFree!} />
                        <div className="flex flex-col gap-3">
                            <h1 className="text-2xl font-semibold">{name}</h1>
                            <p className="text-lg">{description}</p>
                        </div>
                    </NavLink>
                ))}
        </section>
    );
};
