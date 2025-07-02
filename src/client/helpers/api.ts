import { Config } from "@/client/helpers/config";
import { buildBearerAuthHeaders, httpClient, queryClient } from "@/client/helpers/http";
import { ErrorMessage } from "@/shared/constants";
import { eventsSchema } from "@/shared/schemas";
import type { TAddEvent, TEvent } from "@/shared/types";

const invalidateEvents = () => queryClient.invalidateQueries({ queryKey: ["events"] });

const fetchAndParseEvents = async () => {
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
};

const addEvent = async (event: TAddEvent) => {
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
};

const editEvent = async (event: TEvent) => {
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
};

const deleteEvent = async (eventId: string) => {
  try {
    const { headers } = buildBearerAuthHeaders();
    await httpClient.DELETE(`${Config.API_URL}/event/${eventId}`, {
      headers,
    });
  } catch (error) {
    console.error("Failed to delete event:", error);
    throw new Error(ErrorMessage.DeleteEvent);
  }
};

const login = async () => {
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
};

export const api = {
  invalidateEvents,
  fetchAndParseEvents,
  addEvent,
  editEvent,
  deleteEvent,
  login,
};

export const eventsQuery = { queryKey: ["events"], queryFn: fetchAndParseEvents };

export const isAdminQuery = { queryKey: ["isAdmin"], queryFn: login };
