import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

import { Modal } from "@/client/components/Modal";
import { useModal } from "@/client/hooks/useModal";

export const Root = () => {
  const { modalContent, modalProps } = useModal();

  return (
    <>
      <Outlet />
      <Modal {...modalProps}>{modalContent}</Modal>
      <Toaster toastOptions={{ duration: 4000 }} />
      <TanStackRouterDevtools />
    </>
  );
};
