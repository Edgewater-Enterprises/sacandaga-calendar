import { Config } from "@client/helpers/config";
import { buildBearerAuthHeaders, httpClient, queryClient } from "@client/helpers/http";
import { ErrorMessage } from "@shared/constants";
import type { TAddEvent, TEvent } from "@shared/types";

const invalidateEvents = () => queryClient.invalidateQueries({ queryKey: ["events"] });

const addEvent = async (event: TAddEvent) => {
  const { headers } = buildBearerAuthHeaders();

  try {
    await httpClient.POST(`${Config.API_URL}/event`, {
      headers,
      body: event,
    });
  } catch (_error) {
    throw new Error(ErrorMessage.AddEvent);
  }
};

const editEvent = async (event: TEvent) => {
  const { headers } = buildBearerAuthHeaders();

  try {
    await httpClient.PATCH(`${Config.API_URL}/event/${event.id}`, {
      headers,
      body: event,
    });
  } catch (_error) {
    throw new Error(ErrorMessage.EditEvent);
  }
};

const deleteEvent = async (eventId: string) => {
  const { headers } = buildBearerAuthHeaders();

  try {
    await httpClient.DELETE(`${Config.API_URL}/event/${eventId}`, {
      headers,
    });
  } catch (_error) {
    throw new Error(ErrorMessage.DeleteEvent);
  }
};

const isBearerTokenValid = async (password?: string) => {
  try {
    const { headers, token } = buildBearerAuthHeaders(password);

    if (!token) return false;

    const res = await httpClient
      .POST(`${Config.API_URL}/login`, {
        headers,
      })
      .catch(error => {
        console.error("Failed to validate token:", error);
      });
    return res ? res.ok : false;
  } catch (_error) {
    return false;
  }
};

export const api = { invalidateEvents, addEvent, editEvent, deleteEvent, isBearerTokenValid };
