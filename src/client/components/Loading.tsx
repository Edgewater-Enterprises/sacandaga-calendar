import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

export const Loading = () => {
	const [isShowLoadingIndicator, setIsShowLoadingIndicator] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setIsShowLoadingIndicator(true), 1000);
		return () => clearTimeout(timeout);
	}, []);

	if (!isShowLoadingIndicator) return null;

	return (
		<div className="absolute-centered">
			<CircularProgress size={100} />
		</div>
	);
};
