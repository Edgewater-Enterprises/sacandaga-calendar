import { API_URL_DEV, API_URL_PROD, Env } from "@shared/constants";

const isLocal =
  self.location.hostname === "localhost" ||
  self.location.hostname === "127.0.0.1" ||
  self.location.hostname.startsWith("192.168.");

export const Config = {
  IS_PROD: import.meta.env.MODE === Env.Production,
  API_URL: isLocal ? API_URL_DEV : API_URL_PROD,
};
