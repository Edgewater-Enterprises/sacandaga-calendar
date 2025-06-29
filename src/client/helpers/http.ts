import { Config } from "@client/helpers/config";
import { useAuth } from "@client/hooks/useAuth";
import { ErrorMessage } from "@shared/constants";
import { eventsSchema } from "@shared/schemas";
import { QueryClient } from "@tanstack/react-query";

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

export const buildBearerAuthHeaders = (password?: string) => {
  const headers = new Headers();
  const token = password ?? useAuth.getState().token;
  if (!token) return { headers, token };
  headers.set("Authorization", `Bearer ${token}`);
  return { headers, token };
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
  const requestHeaders = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  if (headers) {
    headers.forEach((value, key) => {
      requestHeaders.set(key, value);
    });
  }

  return fetch(url, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
};
