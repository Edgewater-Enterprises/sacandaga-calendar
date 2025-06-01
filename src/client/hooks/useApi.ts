import { useLoaderData } from "react-router-dom";

import type { TEvent } from "@shared/types";

// For initial data fetching to be done via React Router loader before React renders
export const loader = async () => {
	// mock event data for now
	const events: TEvent[] = [
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
	return events;
};

// For API interactions to be used within React components
export const useApi = () => {
	const events = useLoaderData<typeof loader>();

	return { events };
};
