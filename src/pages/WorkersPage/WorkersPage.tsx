import { useQuery } from "@tanstack/react-query";
import { getWorkers } from "../../api/workers";
import { NavLink } from "react-router-dom";
import { imgBase64Part } from "../../storage";

export const WorkersPage = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["workers"],
        queryFn: getWorkers,
    });

    return (
        <main>
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error.message}</div>}
            {data && (
                <>
                    {data?.map(({ id, name, photo, description }) => (
                        <NavLink to={`/workers/${id}`} key={id}>
                            <div>
                                <img src={imgBase64Part + photo} alt={"<->_<->"} />
                                <div>
                                    <h1>{name}</h1>
                                    <p>{description}</p>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </>
            )}
        </main>
    );
};
