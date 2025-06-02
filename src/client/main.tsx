import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "@client/components/ErrorBoundary";
import { Home } from "@client/components/Home";
import { Layout } from "@client/components/Layout";
import { assertGetElementById, registerServiceWorker } from "@client/helpers/browser";
import { loader } from "@client/hooks/useApi";

window.addEventListener("load", () => {
	registerServiceWorker().catch(error => {
		console.error("Service worker registration failed:", error);
	});
});

const root = assertGetElementById("root");
createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<RouterProvider
				router={createBrowserRouter([
					{
						element: <Layout />,
						errorElement: <ErrorBoundary />,
						hydrateFallbackElement: <></>,
						children: [{ path: "/", element: <Home />, loader, index: true }]
					}
				])}
			/>
		</QueryClientProvider>
	</StrictMode>
);
