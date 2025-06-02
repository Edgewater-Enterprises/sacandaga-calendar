import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import type { TAddEvent, TEvent } from "@shared/types";

// For initial data fetching to be done via React Router loader before React renders
export const loader = async () => {
	// Mock event data for now
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
	const [events, setEvents] = useState(useLoaderData<typeof loader>());

	const addEvent = (toAdd: TAddEvent) => {
		const newEvent: TEvent = {
			id: crypto.randomUUID(),
			...toAdd
		};
		setEvents(current => [...current, newEvent]);
	};

	const deleteEvent = (id: string) => {
		setEvents(current => current.filter(event => event.id !== id));
	};

	return { events, addEvent, deleteEvent };
};
