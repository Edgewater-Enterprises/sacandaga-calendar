import { Outlet } from "react-router-dom";

import { Header } from "@client/components/Header";

export const Layout = () => {
	return (
		<div className="layout">
			<Header />
			<main style={{ flex: 1, overflowY: "auto" }}>
				<Outlet />
			</main>
		</div>
	);
};
