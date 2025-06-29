import { ErrorBoundary } from "@client/components/ErrorBoundary";
import { Home } from "@client/components/Home";
import { Layout } from "@client/components/Layout";
import { Loading } from "@client/components/Loading";
import { ModalProvider } from "@client/components/ModalProvider";
import { isBearerTokenValid } from "@client/helpers/api";
import { assertGetElementById, registerServiceWorker } from "@client/helpers/browser";
import { queryClient } from "@client/helpers/http";
import { loaderQuery } from "@client/hooks/useApi";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

window.addEventListener("load", () => {
  registerServiceWorker().catch(error => {
    console.error("Service worker registration failed:", error);
  });
});

const root = assertGetElementById("root");
createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
              element: <Layout />,
              errorElement: <ErrorBoundary />,
              hydrateFallbackElement: <Loading />,
              children: [
                {
                  index: true,
                  element: <Home />,
                  loader: async () => {
                    const [events, isAdmin] = await Promise.all([
                      queryClient.ensureQueryData(loaderQuery),
                      isBearerTokenValid(),
                    ]);
                    return { events, isAdmin };
                  },
                },
              ],
            },
          ])}
        />
      </ModalProvider>
    </QueryClientProvider>
  </StrictMode>,
);
