import { Outlet } from "react-router-dom";

import { Header } from "@client/components/Header";

export const Layout = () => {
	return (
		<div className="layout">
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
};
