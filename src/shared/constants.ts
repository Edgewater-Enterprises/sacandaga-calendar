import { z } from "zod";

import type { TConfig } from "@shared/types";
import { author, description, license, version } from "package.json";

export const AppInfo = {
	name: "Sacandaga Calendar",
	version,
	description,
	author: {
		name: author,
		url: "https://cdleveille.net"
	},
	license,
	url: "https://sacandaga.fly.dev"
};

export const DefaultConfig: TConfig = {
	PORT: 3000
};

export enum Env {
	Production = "production",
	Development = "development"
}

export enum Path {
	Public = "public",
	ClientSrc = "src/client"
}

export enum ErrorMessage {
	InternalServerError = "Internal Server Error"
}

export const STORED_STATE_PREFIX = "state";

export const HASH_PREFIX = "~";

export const HASH_REGEX = new RegExp(`${HASH_PREFIX}.{8}\\.[a-zA-Z0-9]+$`);
