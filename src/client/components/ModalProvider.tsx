import { useState } from "react";

import { EventDelete } from "@/client/components/EventDelete";
import { EventForm } from "@/client/components/EventForm";
import { EventView } from "@/client/components/EventView";
import { Login } from "@/client/components/Login";
import { ModalContext } from "@/client/helpers/context";
import type { TEvent, TModalProps } from "@/shared/types";

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

  const deleteEvent = (event: TEvent) => setModalContent(<EventDelete {...event} />);

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
        deleteEvent,
        showLogin,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
