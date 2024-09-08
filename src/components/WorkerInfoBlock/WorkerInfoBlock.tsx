import { Worker } from "../../types/workers.types";
import { prettyDate } from "../../utils/datesCalculating";
import { WorkerPhoto } from "../WorkerImage/WorkerImage";

export const WorkerInfoBlock = ({
    worker,
    isLoading,
}: {
    worker: Worker;
    isLoading: boolean;
}) => {
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="w-full flex flex-col rounded-2xl shadow-[0px_2px_7px_4px_rgba(0,0,0,0.1)]">
            <div className="w-full h-32 bg-black rounded-t-2xl bg-gradient-to-r from-[var(--color1)] via-[var(--color2)] to-[var(--color2)]" />
            <div className="w-full h-96 rounded-b-2xl p-[var(--main-ver-pd)]">
                <div>
                    <WorkerPhoto binaryString={worker.photo} isFree={worker.isFree} />
                    <div>
                        <h1>
                            {worker.name}
                            {worker.isFree ? <span>Доступен</span> : <span>Занят</span>}
                        </h1>
                        <p>{worker.post}</p>
                        <div>
                            <p>🎂{prettyDate(worker.birthDate)}</p>
                            <p>📍{worker.city}</p>
                            <p>🕓{worker.timeZone}</p>
                        </div>
                        <button>{"(->)"}</button>
                        <button>Скопировать контакты</button>
                    </div>
                </div>
                <div className="w-full">
                    <p>{worker.description}</p>В команде с
                    <p>{prettyDate(worker.inTeamDate)}</p>
                </div>
            </div>
        </div>
    );
};
