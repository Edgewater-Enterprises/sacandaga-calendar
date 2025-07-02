import { QueryClient } from "@tanstack/react-query";
import { Config } from "@/client/helpers/config";
import { buildBearerAuthHeaders, httpClient } from "@/client/helpers/http";
import { ErrorMessage } from "@/shared/constants";
import { eventsSchema } from "@/shared/schemas";
import type { TAddEvent, TEvent } from "@/shared/types";

export const api = {
  fetchAndParseEvents: async () => {
    try {
      const res = await httpClient.GET(`${Config.API_URL}/event`);

      if (!res.ok) {
        console.error("Bad response fetching events:");
        throw res;
      }

      const unparsedEvents = await res.json();

      const events = await eventsSchema.parseAsync(unparsedEvents);

      return events;
    } catch (error) {
      console.error(error);
      throw new Error(ErrorMessage.LoadEventData);
    }
  },

  addEvent: async (event: TAddEvent) => {
    try {
      const { headers } = buildBearerAuthHeaders();
      await httpClient.POST(`${Config.API_URL}/event`, {
        headers,
        body: event,
      });
    } catch (error) {
      console.error("Failed to add event:", error);
      throw new Error(ErrorMessage.AddEvent);
    }
  },

  editEvent: async (event: TEvent) => {
    try {
      const { headers } = buildBearerAuthHeaders();
      await httpClient.PATCH(`${Config.API_URL}/event/${event.id}`, {
        headers,
        body: event,
      });
    } catch (error) {
      console.error("Failed to edit event:", error);
      throw new Error(ErrorMessage.EditEvent);
    }
  },

  deleteEvent: async (eventId: string) => {
    try {
      const { headers } = buildBearerAuthHeaders();
      await httpClient.DELETE(`${Config.API_URL}/event/${eventId}`, {
        headers,
      });
    } catch (error) {
      console.error("Failed to delete event:", error);
      throw new Error(ErrorMessage.DeleteEvent);
    }
  },

  invalidateEvents: () => queryClient.invalidateQueries({ queryKey: ["events"] }),

  invalidateIsAdmin: () => queryClient.invalidateQueries({ queryKey: ["isAdmin"] }),

  login: async () => {
    try {
      const { headers, token } = buildBearerAuthHeaders();
      if (!token) return false;
      const res = await httpClient.POST(`${Config.API_URL}/login`, {
        headers,
      });
      return res.ok;
    } catch (error) {
      console.error("Failed to validate token:", error);
      return false;
    }
  },
};

export const queryClient = new QueryClient();

export const eventsQuery = { queryKey: ["events"], queryFn: api.fetchAndParseEvents };

export const isAdminQuery = { queryKey: ["isAdmin"], queryFn: api.login };
