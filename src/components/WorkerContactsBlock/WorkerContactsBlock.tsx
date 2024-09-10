import { contacts } from "../../storage";
import { Worker } from "../../types/workers.types";
import { Contact } from "../Contact/Contact";

export const WorkerContactsBlock = ({ worker }: { worker: Worker }) => {
    return (
        <div className="w-full flex flex-col gap-6 p-4 rounded-3xl shadow-[0px_1px_6px_3px_rgba(0,0,0,0.1)]">
            <h1 className="text-4xl font-semibold">Контакты</h1>
            <ul className="flex gap-10 flex-wrap">
                {contacts.map(contact => (
                    <Contact
                        key={contact.id}
                        contact={worker.contacts[contact.socialName]}
                        socialName={contact.socialName}
                    />
                ))}
            </ul>
        </div>
    );
};
