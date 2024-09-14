import { useSearchParams } from "react-router-dom";

export const useIsEdit = (): boolean => {
    const [searchParams] = useSearchParams();
    if (searchParams.get("edit") === "true") {
        return true;
    } else {
        return false;
    }
};
