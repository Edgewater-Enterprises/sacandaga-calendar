import { fetchAndParseEvents } from "@client/helpers/http";
import { useQuery } from "@tanstack/react-query";

import { ErrorMessage } from "@shared/constants";
import type { TAddEvent, TEditEvent } from "@shared/types";

export const loaderQuery = { queryKey: ["events"], queryFn: fetchAndParseEvents };

export const useApi = () => {
	const { data: events } = useQuery({ staleTime: 1000, ...loaderQuery });
	if (!events) throw new Error(ErrorMessage.FailedToLoadCalendarData);

	const addEvent = (toAdd: TAddEvent) => {
		//
	};

	const editEvent = (id: string, event: TEditEvent) => {
		//
	};

	const deleteEvent = (id: string) => {
		//
	};

	return { events, addEvent, editEvent, deleteEvent };
};
