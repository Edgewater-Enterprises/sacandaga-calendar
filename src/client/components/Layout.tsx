import { Outlet } from "react-router-dom";

import { Modal } from "@client/components/Modal";
import { useApp } from "@client/hooks/useApp";

export const Layout = () => {
	const { modalContent, modalProps } = useApp();

	return (
		<>
			<main className="layout">
				<Outlet />
			</main>
			<Modal {...modalProps}>{modalContent}</Modal>
		</>
	);
};
