export const Skill = ({ skillName }: { skillName: string }) => {
    return (
        <span className="text-xl py-[10px] px-5 rounded-xl bg-[color:var(--color5)]">
            {skillName}
        </span>
    );
};
