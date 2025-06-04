import { Outlet } from "react-router-dom";

import { Modal } from "@client/components/Modal";
import { useApp } from "@client/hooks/useApp";

export const Layout = () => {
	const { modalContent, modalProps } = useApp();

	return (
		<div className="layout">
			<Outlet />
			<Modal {...modalProps}>{modalContent}</Modal>
		</div>
	);
};
