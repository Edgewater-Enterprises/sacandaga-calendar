import { eventsSchema } from "@shared/schemas";
import { QueryClient } from "@tanstack/react-query";

export const fetchEvents = async () => {
	// Using mock data for now
	const unparsedEvents = [
		{
			id: "3f6c8b2d-9e1b-4a3a-91d6-427d3e0cf59e",
			title: "Example Stay",
			description: "A stay at the lake!",
			start: "2025-06-16",
			end: "2025-06-21"
		},
		{
			id: "f9d2b81e-47df-4c93-8b62-6d0a9c8ffb4e",
			title: "Chris & Friends",
			start: "2025-08-29",
			end: "2025-09-02"
		}
	];
	try {
		const events = eventsSchema.parse(unparsedEvents);
		return events;
	} catch (error) {
		console.error("Failed to validate events:", error);
		throw new Error("Calendar data does not match expected schema");
	}
};

export const queryClient = new QueryClient();

export const httpClient = {
	GET: async <T>(url: string, { headers }: { headers?: Headers } = {}) =>
		request<T>({ url, method: "GET", headers }),
	POST: async <T>(url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
		request<T>({ url, method: "POST", headers, body }),
	PUT: async <T>(url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
		request<T>({ url, method: "PUT", headers, body }),
	DELETE: async <T>(url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
		request<T>({ url, method: "DELETE", headers, body })
};

const request = async <T>({
	url,
	method,
	headers,
	body
}: { url: string; method: string; headers?: Headers; body?: unknown }) => {
	const res = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(headers ?? [])
		},
		body: body ? JSON.stringify(body) : undefined
	});
	const data = (await res.json()) as T;
	if (!res.ok) throw data ?? new Error("Request failed", { cause: res });
	return data;
};
