import { useEffect, useState } from "react";

import { EventDelete } from "@/client/components/EventDelete";
import { EventForm } from "@/client/components/EventForm";
import { EventView } from "@/client/components/EventView";
import { Login } from "@/client/components/Login";
import { ModalContext } from "@/client/helpers/context";
import type { TEvent } from "@/shared/types";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();

  useEffect(() => {
    if (modalContent) setIsOpen(true);
  }, [modalContent]);

  const closeModal = () => setIsOpen(false);

  const clearModal = () => setModalContent(null);

  const viewEvent = (event: TEvent) => setModalContent(<EventView {...event} />);

  const addEvent = (start?: string) => setModalContent(<EventForm start={start} />);

  const editEvent = (event: TEvent) => setModalContent(<EventForm {...event} />);

  const deleteEvent = (event: TEvent) => setModalContent(<EventDelete {...event} />);

  const showLogin = () => setModalContent(<Login />);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalContent,
        closeModal,
        clearModal,
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
