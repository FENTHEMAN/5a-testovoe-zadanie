import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import { RootLayout } from "../routes/RootLayout";
import { RootRoute } from "../routes/RootRoute";
import { WorkersRoute } from "../routes/WorkersRoute";
import { queryClient } from "./queryClient";
import { getWorkerById, getWorkers } from "../api/workers";
import { WorkerRoute } from "../routes/WorkerRoute";
import { WorkerNotFound } from "../components/WorkerNotFound/WorkerNotFound";

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
                    return defer({
                        workers: queryClient.fetchQuery({
                            queryKey: ["workers"],
                            queryFn: getWorkers,
                            staleTime: 1000 * 60,
                        }),
                    });
                },
            },
            {
                path: "/workers/:workerId",
                element: <WorkerRoute />,
                errorElement: <WorkerNotFound />,
                loader: async ({ params }) => {
                    return defer({
                        worker: queryClient.fetchQuery({
                            queryKey: ["worker"],
                            queryFn: () => getWorkerById(params.workerId!),
                            staleTime: 1 * 60,
                        }),
                        workerId: params.workerId!,
                    });
                },
            },
        ],
    },
]);

export const Router = () => {
    return <RouterProvider router={router} />;
};
