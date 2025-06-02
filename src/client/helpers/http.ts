import { eventsSchema } from "@shared/schemas";
import { QueryClient } from "@tanstack/react-query";

import { EventColor } from "@shared/constants";

export const fetchEvents = async () => {
	// Using mock data for now
	const unparsedEvents = [
		{
			id: crypto.randomUUID(),
			title: "Opening Weekend",
			start: "2025-07-04",
			end: "2025-07-06",
			description: "Elaine, Rick, Mark, Danee",
			backgroundColor: EventColor.Blue
		},
		{
			id: crypto.randomUUID(),
			title: "Michael & Katie",
			start: "2025-07-25",
			end: "2025-08-10",
			backgroundColor: EventColor.Orange
		},
		{
			id: crypto.randomUUID(),
			title: "Scott, Doug, Mark, Elaine, Rick",
			start: "2025-08-16",
			end: "2025-08-23",
			backgroundColor: EventColor.Purple
		},
		{
			id: crypto.randomUUID(),
			title: "Chris & Friends",
			start: "2025-08-28",
			end: "2025-09-02",
			backgroundColor: EventColor.Orange
		}
	];
	try {
		const events = eventsSchema.parse(unparsedEvents);
		return events;
	} catch (error) {
		console.error("Failed to parse schema of fetched events:", error);
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
