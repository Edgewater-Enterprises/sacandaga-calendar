import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

import { Modal } from "@/client/components/Modal";

export const Root = () => {
  return (
    <>
      <Outlet />
      <Modal />
      <Toaster toastOptions={{ duration: 4000 }} />
      <TanStackRouterDevtools />
    </>
  );
};
