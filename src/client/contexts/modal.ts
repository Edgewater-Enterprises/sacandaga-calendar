import type { TModalContext } from "@shared/types";
import { createContext } from "react";

export const ModalContext = createContext<TModalContext | null>(null);
