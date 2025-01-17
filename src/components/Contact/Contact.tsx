import { contactColor, contactImg, SocialName } from "../../storage";
import { copyClipboard } from "../../utils/copyClipboard";
import { formatPhoneNumber } from "../../utils/phoneFormated";

export const Contact = ({
    contact,
    socialName,
}: {
    contact: string;
    socialName: SocialName;
}) => {
    return (
        <button
            className={`bg-${
                contactColor[socialName]
            } flex-auto flex rounded-full items-center justify-between py-[0.6rem] px-4 ${
                contact === "" && "hidden"
            }`}
            onClick={() => copyClipboard(contact)}
        >
            <div className="flex gap-2">
                <img
                    className="w-7 h-7"
                    src={`/images/${contactImg[socialName]}`}
                    alt="Soc"
                />
                <p className="text-left">
                    {socialName !== "phone" ? contact : formatPhoneNumber(contact)}
                </p>
            </div>
            <img className="w-5 h-5" src="/images/copy.svg" alt="Copy" />
        </button>
    );
};
