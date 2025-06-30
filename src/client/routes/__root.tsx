import { ErrorBoundary, NotFound } from "@client/components/Error";
import { Root } from "@client/components/Root";

import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Root,
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});
