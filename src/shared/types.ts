import type { eventSchema, eventsSchema } from "@shared/schemas";
import type { z } from "zod";

export type TConfig = {
  PORT: number;
};

export type TModalContext = {
  modalContent?: React.ReactNode;
  modalProps?: TModalProps;
  closeModal: () => void;
  viewEvent: (event: TEvent) => void;
  addEvent: (start?: string) => void;
  editEvent: (event: TEvent) => void;
  showLogin: () => void;
};

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type TEvent = z.infer<typeof eventSchema>;

export type TEvents = z.infer<typeof eventsSchema>;

export type TAddEvent = Omit<TEvent, "id">;

export type TEditEvent = { id: TEvent["id"] } & Partial<Omit<TEvent, "id">>;

export type TModalProps = {
  onClose?: () => void;
  showCloseBtn?: boolean;
};

export type TAuth = {
  token: string | null;
  setToken: (token: string) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
};
