import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Worker } from "../../types/workers.types";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorker } from "../../api/workers";
import { contactHeading, contacts } from "../../storage";

export const WorkerContactsForm = ({ worker }: { worker: Worker }) => {
    const schema = yup.object().shape({
        telegram: yup
            .string()
            .matches(
                /^(?!@)(?:https?:\/\/t\.me\/[a-zA-Z0-9_]+|[a-zA-Z0-9_]+)?$/,
                "Некорректный Telegram"
            )
            .nullable(),
        rocketChat: yup
            .string()
            .matches(
                /^(?!@)(?:https?:\/\/chat\.rocket\.com\/user\/[a-zA-Z0-9_]+|[a-zA-Z0-9_]+)?$/,
                "Некорректный RocketChat"
            )
            .nullable(),
        phone: yup.string().matches(/^[\d\s()+-]*$/, "Некорректный номер телефона"),
        email: yup.string().email("Некорректный email"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: worker.contacts!.email!,
            phone: worker.contacts!.phone!,
            rocketChat: worker.contacts!.rocketChat!,
            telegram: worker.contacts!.telegram!,
        },
        resolver: yupResolver(schema),
        shouldFocusError: false,
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
        email?: string;
        phone?: string;
        telegram?: string | null;
        rocketChat?: string | null;
    }> = data => {
        workerUpdateMutation.mutate({
            contacts: {
                email: data.email!,
                phone: data.phone!,
                telegram: data.telegram!,
                rocketChat: data.rocketChat!,
            },
        });
    };

    return (
        <form className="flex gap-10 flex-wrap">
            {contacts.map(contact => (
                <div key={contact.socialName} className="flex-auto flex flex-col gap-1">
                    <label>{contactHeading[contact.socialName]}</label>
                    <input
                        className={`p-3 rounded-xl border-2 border-[var(--color4)] outline-none ${
                            errors[contact.socialName]?.message &&
                            "border-red-500 border-[1px]"
                        }`}
                        {...register(contact.socialName)}
                        onBlur={handleSubmit(onSubmit)}
                    />
                </div>
            ))}
        </form>
    );
};
