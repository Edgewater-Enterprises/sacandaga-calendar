import { EventColor } from "@shared/constants";
import { z } from "zod";

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  start: z.string(),
  end: z.string(),
  background_color: z.nativeEnum(EventColor),
});

export const eventsSchema = z.array(eventSchema);
