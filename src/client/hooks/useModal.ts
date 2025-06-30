import { useContext } from "react";

import { ModalContext } from "@/client/helpers/context";

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within a child component of ModalProvider");
  }
  return ctx;
};
