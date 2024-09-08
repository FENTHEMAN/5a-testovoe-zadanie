import { contactColor, contactImg } from "../../storage";
import { copyClipboard } from "../../utils/copyClipboard";

export const Contact = ({
    contact,
    socialName,
}: {
    contact: string;
    socialName: string;
}) => {
    return (
        <button
            className={`bg-${contactColor[socialName]} flex-auto flex rounded-full items-center justify-between py-2 px-4`}
            onClick={() => copyClipboard(contact)}
        >
            <div className="flex gap-2">
                <img
                    className="w-7 h-7"
                    src={`/images/${contactImg[socialName]}`}
                    alt="Soc"
                />
                <p className="text-left">{contact}</p>
            </div>
            <img className="w-5 h-5" src="/images/copy.svg" alt="Copy" />
        </button>
    );
};
