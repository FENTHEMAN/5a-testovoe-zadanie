export const TeamUnit = ({
    unitNaming,
    name,
    link,
}: {
    unitNaming: string;
    name: string;
    link: string;
}) => {
    return (
        <div className="col-span-1 flex flex-col gap-1">
            <label>{unitNaming}</label>
            <div className="w-full p-3 rounded-xl border-2 border-[var(--color4)] flex justify-between">
                <p className="shrink">{name}</p>
                <a className="shrink-0" href={link}>
                    <img src="/images/link.svg" alt="" />
                </a>
            </div>
        </div>
    );
};
