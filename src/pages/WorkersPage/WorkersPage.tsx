import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { WorkersSearchSkeleton } from "../../components/WorkersSearch/WorkersSearchSkeleton";
import { WorkersSearch } from "../../components/WorkersSearch/WorkersSearch";

export const WorkersPage = () => {
    const deferWorkersData = useLoaderData() as { workers: Worker[] };

    return (
        <main className="w-full flex flex-col gap-9 px-[var(--main-gor-pd)] py-[var(--main-ver-pd)]">
            <Suspense fallback={<WorkersSearchSkeleton />}>
                <Await resolve={deferWorkersData}>
                    <WorkersSearch />
                </Await>
            </Suspense>
        </main>
    );
};
