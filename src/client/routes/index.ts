import { Home } from "@client/components/Home";
import { api } from "@client/helpers/api";
import { queryClient } from "@client/helpers/http";
import { loaderQuery } from "@client/hooks/useApi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const [events, isAdmin] = await Promise.all([
      queryClient.ensureQueryData(loaderQuery),
      api.login(),
    ]);
    return { events, isAdmin };
  },
});
