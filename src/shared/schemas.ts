import { z } from "zod";

export const eventSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional(),
	start: z.string(),
	end: z.string(),
	backgroundColor: z.string()
});

export const eventsSchema = z.array(eventSchema);
