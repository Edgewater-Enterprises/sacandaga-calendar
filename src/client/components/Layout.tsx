import { Outlet } from "react-router-dom";

import { Header } from "@client/components/Header";

import { Modal } from "@client/components/Modal";
import { useApp } from "@client/hooks/useApp";

export const Layout = () => {
	const { modalContent, modalProps } = useApp();

	return (
		<div className="layout">
			<Header />
			<main>
				<Outlet />
			</main>
			<Modal {...modalProps}>{modalContent}</Modal>
		</div>
	);
};
