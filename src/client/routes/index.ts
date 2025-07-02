import { createFileRoute } from "@tanstack/react-router";

import { Home } from "@/client/components/Home";
import { eventsQuery, isAdminQuery } from "@/client/helpers/api";
import { queryClient } from "@/client/helpers/http";

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
