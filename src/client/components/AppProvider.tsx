import { useState } from "react";

import { EventView } from "@client/components/EventView";
import { AppContext } from "@client/contexts/app";
import type { TEvent, TModalProps } from "@shared/types";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [modalContent, setModalContent] = useState<React.ReactNode>();
	const [modalProps, setModalProps] = useState<TModalProps>();

	const closeModal = () => setModalContent(null);

	const viewEvent = (event: TEvent) => {
		setModalContent(<EventView {...event} />);
		setModalProps({ showCloseBtn: true });
	};

	return (
		<AppContext.Provider value={{ modalContent, modalProps, closeModal, viewEvent }}>
			{children}
		</AppContext.Provider>
	);
};
