import { contacts } from "../../storage";
import { Contact } from "../Contact/Contact";
import { WorkerContactsBlockSkeleton } from "./WorkerContactsBlockSkeleton";
import { useIsEdit } from "../../hooks/useIsEdit";
import { WorkerContactsForm } from "./WorkerContactsForm";
import { useWorker } from "../../hooks/useWorker";

export const WorkerContactsBlock = ({ workerId }: { workerId: string }) => {
    const { data, isLoading } = useWorker(workerId);

    const isEdit = useIsEdit();

    if (isLoading) return <WorkerContactsBlockSkeleton />;
    else
        return (
            <section className="w-full flex flex-col gap-6 p-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
                <h1 className="text-4xl font-semibold">Контакты</h1>
                {isEdit ? (
                    <WorkerContactsForm worker={data!} />
                ) : (
                    <ul className="flex gap-10 flex-wrap">
                        {contacts.map(contact => (
                            <Contact
                                key={contact.id}
                                contact={data!.contacts![contact.socialName]}
                                socialName={contact.socialName}
                            />
                        ))}
                    </ul>
                )}
            </section>
        );
};
