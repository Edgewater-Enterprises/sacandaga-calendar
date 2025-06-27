import { eventsSchema } from "@shared/schemas";
import { QueryClient } from "@tanstack/react-query";

import { Config } from "@client/helpers/config";
import { ErrorMessage } from "@shared/constants";

export const fetchAndParseEvents = async () => {
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

export const queryClient = new QueryClient();

export const buildBearerAuthHeaders = (token: string) => {
  const headers = new Headers();
  if (!token) return headers;
  headers.set("Authorization", `Bearer ${token}`);
  return headers;
};

export const httpClient = {
  GET: (url: string, { headers }: { headers?: Headers } = {}) =>
    request({ url, method: "GET", headers }),
  POST: (url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
    request({ url, method: "POST", headers, body }),
  PATCH: (url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
    request({ url, method: "PATCH", headers, body }),
  PUT: (url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
    request({ url, method: "PUT", headers, body }),
  DELETE: (url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
    request({ url, method: "DELETE", headers, body }),
};

const request = ({
  url,
  method,
  headers,
  body,
}: {
  url: string;
  method: string;
  headers?: Headers;
  body?: unknown;
}) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(headers ?? []),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};
