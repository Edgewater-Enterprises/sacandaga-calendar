import { useLoaderData } from "react-router-dom";

import type { TStay } from "@shared/types";

// For initial data fetching to be done via React Router loader before React renders
export const loader = async () => {
	// mock event data for now
	const events: TStay[] = [
		{
			id: "3f6c8b2d-9e1b-4a3a-91d6-427d3e0cf59e",
			title: "Example Stay",
			description: "A stay at the lake!",
			start: "2025-06-16",
			end: "2025-06-21"
		}
	];
	return events;
};

// For API interactions to be used within React components
export const useApi = () => {
	const events = useLoaderData<typeof loader>();

	return { events };
};
