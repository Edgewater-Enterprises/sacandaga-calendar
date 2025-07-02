import { createFileRoute } from "@tanstack/react-router";

import { Home } from "@/client/components/Home";
import { eventsQuery, isAdminQuery, queryClient } from "@/client/helpers/api";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const [events, isAdmin] = await Promise.all([
      queryClient.ensureQueryData(eventsQuery),
      queryClient.ensureQueryData(isAdminQuery),
    ]);
    return { events, isAdmin };
  },
});
