import { fetchAndParseEvents } from "@client/helpers/http";
import { useAuth } from "@client/hooks/useAuth";
import { ErrorMessage } from "@shared/constants";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export const loaderQuery = { queryKey: ["events"], queryFn: fetchAndParseEvents };

export const useApi = () => {
  const { data: events } = useQuery({ staleTime: 1000, ...loaderQuery });
  if (!events) throw new Error(ErrorMessage.LoadEventData);

  const { isAdmin } = useLoaderData<{ isAdmin: boolean }>();

  useEffect(() => {
    useAuth.getState().setIsAdmin(isAdmin);
  }, [isAdmin]);

  return { events };
};
