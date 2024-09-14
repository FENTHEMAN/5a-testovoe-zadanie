import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Worker, WorkerTeam } from "../../types/workers.types";
import { getTeams } from "../../api/teams";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { updateWorker } from "../../api/workers";

export const WorkerTeamForm = ({ worker }: { worker: Worker }) => {
    const schema = yup.object().shape({
        lead: yup.string().required("Выберите руководителя"),
        teamName: yup.string().required("Выберите команду"),
        deputy: yup.string().required("Выберите заместителя"),
        subdivision: yup.string().required("Выберите подразделение"),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            deputy: worker.workerTeam!.deputy.name,
            lead: worker.workerTeam!.lead.name,
            subdivision: worker.workerTeam!.subdivision.name,
            teamName: worker.workerTeam!.teamName.name,
        },
    });

    const { data, isLoading } = useQuery({
        queryKey: ["teams"],
        queryFn: () => getTeams(),
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
        lead: string;
        teamName: string;
        deputy: string;
        subdivision: string;
    }> = d => {
        const workerTeam = {
            lead: data
                ?.find(team => team.leads.find(lead => lead.name === d.lead))
                ?.leads.find(lead => lead.name === d.lead),
            deputy: data
                ?.find(team => team.deputies.find(deputy => deputy.name === d.deputy))
                ?.deputies.find(deputy => deputy.name === d.deputy),
            teamName: {
                name: data?.find(team => team.name === d.teamName)?.name,
                link: data?.find(team => team.name === d.teamName)?.link,
            },
            subdivision: data
                ?.find(team =>
                    team.subdivisions.find(
                        subdivision => subdivision.name === d.subdivision
                    )
                )
                ?.subdivisions.find(subdivision => subdivision.name === d.subdivision),
        };
        workerUpdateMutation.mutate({
            workerTeam: workerTeam as WorkerTeam,
        });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="col-span-1 flex flex-col gap-1">
                <label>Руководитель</label>
                <select
                    className="w-full p-3 rounded-xl border-2 border-[var(--color4)] flex justify-between outline-none cursor-pointer"
                    {...register("lead")}
                    onChangeCapture={handleSubmit(onSubmit)}
                >
                    {data?.map(team =>
                        team.leads.map(lead => (
                            <option key={lead.name} value={lead.name}>
                                {lead.name}
                            </option>
                        ))
                    )}
                </select>
            </div>
            <div className="col-span-1 flex flex-col gap-1">
                <label>Заместитель</label>
                <select
                    className="w-full p-3 rounded-xl border-2 border-[var(--color4)] flex justify-between outline-none cursor-pointer"
                    {...register("deputy")}
                    onChangeCapture={handleSubmit(onSubmit)}
                >
                    {data?.map(team =>
                        team.deputies.map(deputy => (
                            <option key={deputy.name} value={deputy.name}>
                                {deputy.name}
                            </option>
                        ))
                    )}
                </select>
            </div>
            <div className="col-span-1 flex flex-col gap-1">
                <label>Подразделение</label>
                <select
                    className="w-full p-3 rounded-xl border-2 border-[var(--color4)] flex justify-between outline-none cursor-pointer"
                    {...register("subdivision")}
                    onChangeCapture={handleSubmit(onSubmit)}
                >
                    {data?.map(team =>
                        team.subdivisions.map(subdivision => (
                            <option key={subdivision.name} value={subdivision.name}>
                                {subdivision.name}
                            </option>
                        ))
                    )}
                </select>
            </div>
            <div className="col-span-1 flex flex-col gap-1">
                <label>Команда</label>
                <select
                    className="w-full p-3 rounded-xl border-2 border-[var(--color4)] flex justify-between outline-none cursor-pointer"
                    {...register("teamName")}
                    onChangeCapture={handleSubmit(onSubmit)}
                >
                    {data?.map(team => (
                        <option key={team.name} value={team.name}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    );
};
