import { eventsSchema } from "@shared/schemas";
import { QueryClient } from "@tanstack/react-query";

import { Config } from "@client/helpers/config";
import { ErrorMessage } from "@shared/constants";

export const fetchAndParseEvents = async () => {
	const unparsedEvents = await httpClient.GET(`${Config.API_URL}/event`).catch(error => {
		console.error("Failed to fetch events:", error);
		throw new Error(ErrorMessage.FailedToLoadCalendarData);
	});

	const events = eventsSchema.parseAsync(unparsedEvents).catch(error => {
		console.error("Calendar data does not match expected schema:", error);
		throw new Error(ErrorMessage.FailedToLoadCalendarData);
	});

	return events;
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

const request = async <T = unknown>({
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
	const data = await res.json();
	return data as T;
};
