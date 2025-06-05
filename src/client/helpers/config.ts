import { isLocal } from "@client/helpers/browser";
import { API_URL_DEV, API_URL_PROD, Env } from "@shared/constants";

export const Config = {
	IS_PROD: import.meta.env.MODE === Env.Production,
	API_URL: isLocal ? API_URL_DEV : API_URL_PROD
};
