import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AppProvider } from "@client/components/AppProvider";
import { ErrorBoundary } from "@client/components/ErrorBoundary";
import { Home } from "@client/components/Home";
import { Layout } from "@client/components/Layout";
import { assertGetElementById, registerServiceWorker } from "@client/helpers/browser";
import { queryClient } from "@client/helpers/http";
import { loaderQuery } from "@client/hooks/useApi";

window.addEventListener("load", () => {
	registerServiceWorker().catch(error => {
		console.error("Service worker registration failed:", error);
	});
});

const root = assertGetElementById("root");
createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppProvider>
				<RouterProvider
					router={createBrowserRouter([
						{
							path: "/",
							element: <Layout />,
							errorElement: <ErrorBoundary />,
							hydrateFallbackElement: <></>,
							children: [
								{
									index: true,
									element: <Home />,
									loader: () => queryClient.ensureQueryData(loaderQuery)
								}
							]
						}
					])}
				/>
			</AppProvider>
		</QueryClientProvider>
	</StrictMode>
);
