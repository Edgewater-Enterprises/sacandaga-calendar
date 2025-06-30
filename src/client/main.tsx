import { ModalProvider } from "@client/components/ModalProvider";
import { assertGetElementById, registerServiceWorker } from "@client/helpers/browser";
import { queryClient } from "@client/helpers/http";
import { routeTree } from "@client/routes/routeTree.gen";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

window.addEventListener("load", () => {
  registerServiceWorker().catch(error => {
    console.error("Service worker registration failed:", error);
  });
});

const router = createRouter({
  routeTree,
  context: { queryClient },
});

const root = assertGetElementById("root");
createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </QueryClientProvider>
  </StrictMode>,
);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface RouterContext {
    queryClient: QueryClient;
  }
}
