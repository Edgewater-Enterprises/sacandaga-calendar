import { useState } from "react";

import { AddEvent } from "@client/components/AddEvent";
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

  const viewEventInModal = (event: TEvent) => setModalContent(<EventView {...event} />);

  const openAddEventModal = (start?: string) => setModalContent(<AddEvent start={start} />);

  return (
    <AppContext.Provider
      value={{ modalContent, modalProps, closeModal, viewEventInModal, openAddEventModal }}
    >
      {children}
    </AppContext.Provider>
  );
};
