import { fetchAndParseEvents } from "@client/helpers/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Config } from "@client/helpers/config";
import { httpClient } from "@client/helpers/http";
import { ErrorMessage } from "@shared/constants";
import type { TAddEvent, TEditEvent } from "@shared/types";

export const loaderQuery = { queryKey: ["events"], queryFn: fetchAndParseEvents };

export const useApi = () => {
	const { data: events } = useQuery({ staleTime: 1000, ...loaderQuery });
	if (!events) throw new Error(ErrorMessage.FailedToLoadCalendarData);

	const queryClient = useQueryClient();

	const invalidateEvents = () => queryClient.invalidateQueries({ queryKey: ["events"] });

	const addEvent = (toAdd: TAddEvent) => {
		return useMutation({
			mutationFn: async () => {
				const res = await httpClient.POST(`${Config.API_URL}/event`, {
					body: toAdd
				});
				return res;
			},
			onSuccess: invalidateEvents
		});
	};

	const editEvent = (id: string, event: TEditEvent) => {
		//
	};

	const deleteEvent = (id: string) => {
		//
	};

	return { events, addEvent, editEvent, deleteEvent };
};
