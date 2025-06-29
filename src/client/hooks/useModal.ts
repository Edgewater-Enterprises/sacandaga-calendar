import { ModalContext } from "@client/contexts/modal";
import { useContext } from "react";

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within a child component of ModalProvider");
  }
  return ctx;
};
