import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const buildBearerAuthHeaders = () => {
  const headers = new Headers();
  const token = localStorage.getItem("auth-token");
  if (token) headers.set("Authorization", `Bearer ${token}`);
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
