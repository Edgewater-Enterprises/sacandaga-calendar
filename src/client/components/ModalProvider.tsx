import { EventForm } from "@client/components/EventForm";
import { EventView } from "@client/components/EventView";
import { Login } from "@client/components/Login";
import { ModalContext } from "@client/contexts/modal";
import type { TEvent, TModalProps } from "@shared/types";
import { useState } from "react";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalProps, setModalProps] = useState<TModalProps>();

  const closeModal = () => {
    setModalContent(null);
    setModalProps({});
  };

  const viewEvent = (event: TEvent) => setModalContent(<EventView {...event} />);

  const addEvent = (start?: string) => setModalContent(<EventForm start={start} />);

  const editEvent = (event: TEvent) => setModalContent(<EventForm {...event} />);

  const showLogin = () => setModalContent(<Login />);

  return (
    <ModalContext.Provider
      value={{
        modalContent,
        modalProps,
        closeModal,
        viewEvent,
        addEvent,
        editEvent,
        showLogin,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
