import { fetchEvents } from "@client/helpers/http";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { TAddEvent, TEvent } from "@shared/types";

export const loaderQuery = { queryKey: ["events"], queryFn: fetchEvents };

// For API interactions to be used within React components
export const useApi = () => {
	const { data: loadedEvents } = useQuery({ staleTime: 1000, ...loaderQuery });
	if (!loadedEvents) throw new Error("Failed to load calendar data");

	const [events, setEvents] = useState(loadedEvents);

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
