import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootRoute } from "./routes/RootRoute";
import { WorkersRoute } from "./routes/WorkersRoute";
import { WorkerRoute } from "./routes/WorkerRoute";
import { WorkerNotFound } from "./components/WorkerNotFound/WorkerNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getWorkers } from "./api/workers";
import { RootLayout } from "./routes/RootLayout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <RootRoute />,
            },
            {
                path: "/workers",
                element: <WorkersRoute />,
                loader: async () => {
                    return queryClient.fetchQuery({
                        queryKey: ["workers"],
                        queryFn: getWorkers,
                        staleTime: 1000 * 60,
                    });
                },
            },
            {
                path: "/workers/:workerId",
                element: <WorkerRoute />,
                errorElement: <WorkerNotFound />,
            },
        ],
    },
]);

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};
