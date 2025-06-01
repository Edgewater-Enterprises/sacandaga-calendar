import { useLoaderData } from "react-router-dom";

// For initial data fetching to be done via React Router loader before React renders
export const loader = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/todos");
	const data = await res.json();
	return data;
};

// For API interactions to be used within React components
export const useApi = () => {
	const loaderData = useLoaderData<typeof loader>();

	return { loaderData };
};
