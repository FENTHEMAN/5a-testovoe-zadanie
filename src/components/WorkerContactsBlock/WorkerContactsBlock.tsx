import { contacts } from "../../storage";
import { Worker } from "../../types/workers.types";
import { Contact } from "../Contact/Contact";

export const WorkerContactsBlock = ({
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
        <div className="w-full flex flex-col gap-[var(--main-ver-pd)] p-[var(--main-ver-pd)] rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
            <h1 className="text-3xl font-semibold">Контакты</h1>
            <ul className="flex gap-10 flex-wrap">
                {contacts.map(contact => (
                    <Contact
                        contact={worker.contacts[contact.socialName]}
                        socialName={contact.socialName}
                    />
                ))}
            </ul>
        </div>
    );
};
