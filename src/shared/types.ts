import type { z } from "zod";

import type { eventSchema } from "@/shared/schemas";

export type TModalContext = {
  isOpen: boolean;
  modalContent?: React.ReactNode;
  closeModal: () => void;
  clearModal: () => void;
  viewEvent: (event: TEvent) => void;
  addEvent: (start?: string) => void;
  editEvent: (event: TEvent) => void;
  deleteEvent: (event: TEvent) => void;
  showLogin: () => void;
};

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type TEvent = z.infer<typeof eventSchema>;

export type TAddEvent = Omit<TEvent, "id">;

export type TAuth = {
  token: string | null;
  setToken: (token: string) => void;
};
