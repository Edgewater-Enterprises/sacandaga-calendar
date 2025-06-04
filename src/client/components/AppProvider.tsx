import { useState } from "react";

import { EventAdd } from "@client/components/EventAdd";
import { EventView } from "@client/components/EventView";
import { AppContext } from "@client/contexts/app";
import type { TEvent, TModalProps } from "@shared/types";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [modalContent, setModalContent] = useState<React.ReactNode>();
	const [modalProps, setModalProps] = useState<TModalProps>();

	const closeModal = () => {
		setModalContent(null);
		setModalProps({});
	};

	const viewEvent = (event: TEvent) => {
		setModalContent(<EventView {...event} />);
		setModalProps({ showCloseBtn: true });
	};

	const addEvent = () => {
		setModalContent(<EventAdd />);
		setModalProps({ showCloseBtn: true });
	};

	return (
		<AppContext.Provider value={{ modalContent, modalProps, closeModal, viewEvent, addEvent }}>
			{children}
		</AppContext.Provider>
	);
};
