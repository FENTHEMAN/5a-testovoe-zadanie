import { copyClipboard } from "../../utils/copyClipboard";
import { prettyDate } from "../../utils/datesCalculating";
import { WorkerPhoto } from "../WorkerPhoto/WorkerPhoto";
import { useIsEdit } from "../../hooks/useIsEdit";
import { useQuery } from "@tanstack/react-query";
import { getWorkerById } from "../../api/workers";
import { WorkerInfoBlockSkeketon } from "./WorkerInfoBlockSkeketon";
import { WorkerMainInfoForm } from "./WorkerMainInfoForm";
import { WorkerInfoDescription } from "./WorkerInfoDescription";

export const WorkerInfoBlock = ({ workerId }: { workerId: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["worker", workerId],
        queryFn: () => getWorkerById(workerId),
    });

    const isEdit = useIsEdit();

    if (isLoading) return <WorkerInfoBlockSkeketon />;
    else
        return (
            <div className="w-full flex flex-col rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
                <div className="w-full h-36 bg-black rounded-t-3xl bg-gradient-to-r from-[var(--color1)] via-[var(--color2)] to-[var(--color2)]" />
                <div className="w-full flex flex-col gap-[var(--main-ver-pd)] rounded-b-3xl p-[var(--main-ver-pd)]">
                    <div className="w-full flex flex-wrap gap-6">
                        <WorkerPhoto
                            binaryString={data!.photo!}
                            isEdit={isEdit}
                            isFree={data!.isFree!}
                        />
                        {isEdit ? (
                            <WorkerMainInfoForm worker={data!} />
                        ) : (
                            <>
                                <div className="flex flex-col gap-2 pt-2">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-4xl font-semibold">
                                            {data!.name!}
                                        </h1>
                                        {data!.isFree! ? (
                                            <span className="text-[var(--color0)] bg-[var(--color3)] py-1 px-4 rounded-md">
                                                Доступен
                                            </span>
                                        ) : (
                                            <span className="text-lg">Занят</span>
                                        )}
                                    </div>
                                    <p className="text-lg">{data!.post!}</p>
                                    <div className="flex flex-wrap gap-8 group">
                                        <p className="text-xl">
                                            🎂 {prettyDate(data!.birthDate!)}
                                        </p>
                                        <p className="text-xl">📍 {data!.city!}</p>
                                        <p className="text-xl">🕓 {data!.timeZone!}</p>
                                    </div>
                                </div>
                                <button className="ml-auto mb-auto flex-initial h-12 px-2 py-3 rounded-lg bg-[var(--color4)]">
                                    <img src="/images/archive.svg" alt="" />
                                </button>
                                <button
                                    onClick={() =>
                                        copyClipboard(
                                            data!.contacts!.email +
                                                "\n" +
                                                data!.contacts!.telegram +
                                                "\n" +
                                                data!.contacts!.phone +
                                                "\n" +
                                                data!.contacts!.rocketChat
                                        )
                                    }
                                    className="h-min px-8 py-[10px] flex-initial rounded-lg bg-[var(--color4)] text-[19px]"
                                >
                                    Скопировать контакты
                                </button>
                            </>
                        )}
                    </div>
                    <div className="w-full">
                        {isEdit ? (
                            <WorkerInfoDescription worker={data!} />
                        ) : (
                            <>
                                <p className="w-full text-left p-5 rounded-xl border-2 border-[var(--color4)] text-xl">
                                    {data!.description!}
                                </p>
                                <p className="mt-2 mb-1">В команде с</p>
                                <p className="w-full p-3 rounded-xl border-2 border-[var(--color4)]">
                                    {prettyDate(data!.inTeamDate!)}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
};
