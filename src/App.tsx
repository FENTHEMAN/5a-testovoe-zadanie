import { QueryProvider } from "./providers/QueryProvider";
import { Router } from "./providers/Router";

export const App = () => {
    return (
        <QueryProvider>
            <Router />
        </QueryProvider>
    );
};
