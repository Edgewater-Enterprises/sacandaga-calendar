import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorBoundary = () => {
	const routeError = useRouteError();
	console.error(routeError);
	if (isRouteErrorResponse(routeError) || routeError instanceof Response) {
		return <ErrorDisplay error={new Error(routeError.statusText)} />;
	}
	if (routeError instanceof Error) {
		return <ErrorDisplay error={routeError} />;
	}
	if (typeof routeError === "string") {
		return <ErrorDisplay error={new Error(routeError)} />;
	}
	return <ErrorDisplay error={new Error("Unexpected error occurred")} />;
};

const ErrorDisplay = ({
	error
}: {
	error: Error;
}) => {
	return (
		<div
			role="alert"
			style={{
				display: "flex",
				gap: "1rem",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				fontSize: "1.2rem",
				height: "100vh"
			}}
		>
			<p>Oops! Something went wrong.</p>
			<div style={{ color: "red", width: "100%" }}>{error.message}</div>
			<a href="/">Home</a>
		</div>
	);
};
