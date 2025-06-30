import { createContext } from "react";

import type { TModalContext } from "@/shared/types";

export const ModalContext = createContext<TModalContext | null>(null);
