import { useLoaderData } from "react-router-dom";

// For initial data fetching to be done via React Router loader before React renders
export const loader = async () => {
	return null;
};

// For API interactions to be used within React components
export const useApi = () => {
	const loaderData = useLoaderData<typeof loader>();

	return { loaderData };
};
