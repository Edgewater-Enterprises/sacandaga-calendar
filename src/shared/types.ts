import type { z } from "zod";

import type { eventSchema, eventsSchema } from "@shared/schemas";

export type TConfig = {
	PORT: number;
};

export type TAppContext = null;

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type TEvent = z.infer<typeof eventSchema>;
export type TEvents = z.infer<typeof eventsSchema>;

export type TAddEvent = Omit<TEvent, "id">;
