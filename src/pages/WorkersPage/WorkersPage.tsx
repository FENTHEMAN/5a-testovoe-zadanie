import { useLoaderData } from "react-router-dom";

export const WorkersPage = () => {
    const workers = useLoaderData() as Worker[];
    return <div>{workers.length}</div>;
};
