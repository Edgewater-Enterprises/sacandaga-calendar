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
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)"
			}}
		>
			<div
				role="alert"
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					rowGap: "2rem",
					padding: "1rem",
					fontSize: "1.2rem"
				}}
			>
				<h1>Error!</h1>
				<pre style={{ color: "red" }}>{error.message}</pre>
				<a href="/">Home</a>
			</div>
		</div>
	);
};
