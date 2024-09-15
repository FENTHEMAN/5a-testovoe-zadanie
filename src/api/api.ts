import { Method } from "../types/api.types";

export const api = async (
    method: Method,
    url: string,
    body?: unknown
): Promise<unknown> => {
    try {
        switch (method) {
            case "GET": {
                const response = await fetch(url);
                return await response.json();
                break
            }
            default: {
                const response = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                return await response.json();
            }
        }
    } catch (error) {
        const e: Error = error as Error;
        console.error(e.message);
        throw new Error(e.message);
    }
};
