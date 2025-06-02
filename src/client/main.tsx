import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "@client/components/ErrorBoundary";
import { Home } from "@client/components/Home";
import { Layout } from "@client/components/Layout";
import { assertGetElementById, registerServiceWorker } from "@client/helpers/browser";
import { loader } from "@client/hooks/useApi";
import { queryClient } from "@client/helpers/http";

window.addEventListener("load", () => {
	registerServiceWorker().catch(error => {
		console.error("Service worker registration failed:", error);
	});
});

const root = assertGetElementById("root");
createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={createBrowserRouter([
					{
						path: "/",
						element: <Layout />,
						errorElement: <ErrorBoundary />,
						hydrateFallbackElement: <></>,
						children: [{ index: true, element: <Home />, loader }]
					}
				])}
			/>
		</QueryClientProvider>
	</StrictMode>
);
