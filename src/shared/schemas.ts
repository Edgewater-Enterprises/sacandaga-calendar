import { z } from "zod";

export const eventSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	start: z.string(),
	end: z.string(),
	background_color: z.string()
});

export const eventsSchema = z.array(eventSchema);
