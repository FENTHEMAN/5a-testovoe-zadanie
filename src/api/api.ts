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
            }
            case "POST": {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                return await response.json();
            }
            case "PUT": {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                return await response.json();
            }
            case "DELETE": {
                const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                return await response.json();
            }
            case "PATCH": {
                const response = await fetch(url, {
                    method: "PATCH",
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
