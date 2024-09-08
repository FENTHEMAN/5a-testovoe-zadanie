import { imgBase64Part } from "../../storage";

export const WorkerPhoto = ({
    binaryString,
    isFree,
}: {
    binaryString: string;
    isFree: boolean;
}) => {
    return (
        <div>
            {isFree && <div />}
            {!binaryString && <img src={imgBase64Part + binaryString} alt="" />}
        </div>
    );
};
