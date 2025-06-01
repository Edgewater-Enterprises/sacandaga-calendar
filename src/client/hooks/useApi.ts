import { useLoaderData } from "react-router-dom";

// For initial data fetching to be done via React Router loader before React renders
export const loader = async () => {
	const events = [
		{ title: "Elaine Birthday", date: "2025-06-08" },
		{ title: "Father's Day", date: "2025-06-15" },
		{ title: "Chris Birthday", date: "2025-06-18" }
	];
	return events;
};

// For API interactions to be used within React components
export const useApi = () => {
	const events = useLoaderData<typeof loader>();

	return { events };
};
