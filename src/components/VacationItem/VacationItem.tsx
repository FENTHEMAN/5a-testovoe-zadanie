import { Vacation } from "../../types/workers.types";

export const VacationItem = ({
    vacation,
    isFirst,
}: {
    vacation: Vacation;
    isFirst: boolean;
}) => {
    return (
        <div
            className={`w-full flex gap-1 text-xl py-[10px] px-5 rounded-xl ${
                isFirst ? "bg-[color:var(--color5)]" : "bg-[color:var(--color4)]"
            }`}
        >
            <p>a</p>
            <p>s</p>
            <p>d</p>
            <p>f</p>
        </div>
    );
};
