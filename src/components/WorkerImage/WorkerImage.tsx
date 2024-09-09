import { imgBase64Part } from "../../storage";

export const WorkerPhoto = ({
    binaryString,
    isFree,
}: {
    binaryString: string;
    isFree: boolean;
}) => {
    return (
        <div className="w-32 h-32 shrink-0 rounded-full shadow-[0px_0px_5px_2px_rgba(0,0,0,0.2)] border-[4.5px] border-white border-solid">
            {isFree && <div className="absolute" />}
            <div className="w-full h-full flex items-center justify-center shadow-[inset_0px_0px_3px_1px_rgba(0,0,0,0.1)] rounded-full">
                {binaryString !== "" ? (
                    <img
                        className="w-full h-full object-cover rounded-full"
                        src={imgBase64Part + binaryString}
                        alt="Oops..."
                    />
                ) : (
                    <p className="text-2xl">{"˶ˆ ᗜ ˆ˵"}</p>
                )}
            </div>
        </div>
    );
};
