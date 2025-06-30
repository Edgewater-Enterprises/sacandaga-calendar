import { fetchAndParseEvents } from "@client/helpers/http";
import { useAuth } from "@client/hooks/useAuth";
import { ErrorMessage } from "@shared/constants";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { useEffect } from "react";

export const loaderQuery = { queryKey: ["events"], queryFn: fetchAndParseEvents };

export const useApi = () => {
  const { data: events } = useQuery({ staleTime: 1000, ...loaderQuery });
  if (!events) throw new Error(ErrorMessage.LoadEventData);

  const { isAdmin } = getRouteApi("/").useLoaderData();
  useEffect(() => useAuth.getState().setIsAdmin(isAdmin), [isAdmin]);

  return { events };
};
