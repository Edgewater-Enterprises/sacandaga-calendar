import { fetchAndParseEvents } from "@client/helpers/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Config } from "@client/helpers/config";
import { buildBearerAuthHeaders, httpClient } from "@client/helpers/http";
import { usePersistedState } from "@client/hooks/usePersistedState";
import { ErrorMessage } from "@shared/constants";
import type { TAddEvent, TEditEvent } from "@shared/types";

export const loaderQuery = { queryKey: ["events"], queryFn: fetchAndParseEvents };

export const useApi = () => {
	const { data: events } = useQuery({ staleTime: 1000, ...loaderQuery });
	if (!events) throw new Error(ErrorMessage.LoadEventData);

	const [bearerToken, setBearerToken] = usePersistedState({
		initialValue: "",
		id: "token",
		isUseLocalStorage: true
	});
	const headers = buildBearerAuthHeaders(bearerToken);

	const queryClient = useQueryClient();
	const invalidateEvents = () => queryClient.invalidateQueries({ queryKey: ["events"] });

	const addEvent = (event: TAddEvent) => {
		return useMutation({
			mutationFn: async () => {
				try {
					await httpClient.POST(`${Config.API_URL}/event`, {
						headers,
						body: event
					});
				} catch (error) {
					console.error(error);
					throw new Error(ErrorMessage.AddEvent);
				}
			},
			onSuccess: async () => {
				// TODO: Notify user of success
				console.log("Stay created successfully");
				await invalidateEvents();
			}
		});
	};

	const editEvent = (event: TEditEvent) => {
		return useMutation({
			mutationFn: async () => {
				try {
					await httpClient.PATCH(`${Config.API_URL}/event/${event.id}`, {
						headers,
						body: event
					});
				} catch (error) {
					console.error(error);
					throw new Error(ErrorMessage.EditEvent);
				}
			},
			onSuccess: async () => {
				// TODO: Notify user of success
				console.log("Stay updated successfully");
				await invalidateEvents();
			}
		});
	};

	const deleteEvent = (eventId: string) => {
		return useMutation({
			mutationFn: async () => {
				try {
					await httpClient.DELETE(`${Config.API_URL}/event/${eventId}`, {
						headers
					});
				} catch (error) {
					console.error(error);
					throw new Error(ErrorMessage.DeleteEvent);
				}
			},
			onSuccess: async () => {
				// TODO: Notify user of success
				console.log("Stay deleted successfully");
				await invalidateEvents();
			}
		});
	};

	const validateBearerToken = (token: string) => {
		const headers = buildBearerAuthHeaders(token);
		return useMutation({
			mutationFn: async () => {
				const res = await httpClient
					.POST(`${Config.API_URL}/login`, {
						headers: headers
					})
					.catch(error => {
						console.error("Failed to validate token:", error);
						throw new Error(ErrorMessage.ValidateToken);
					});
				if (!res.ok) throw new Error(ErrorMessage.InvalidToken);
			},
			onSuccess: () => {
				// TODO: Notify user of success
				console.log("You are now logged in");
			}
		});
	};

	return { events, addEvent, editEvent, deleteEvent, setBearerToken, validateBearerToken };
};
