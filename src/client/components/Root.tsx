import { Header } from "@client/components/Header";
import { Modal } from "@client/components/Modal";
import { useModal } from "@client/hooks/useModal";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

export const Root = () => {
  const { modalContent, modalProps } = useModal();

  return (
    <>
      <Header />
      <main className="layout">
        <Outlet />
      </main>
      <Modal {...modalProps}>{modalContent}</Modal>
      <Toaster toastOptions={{ duration: 4000 }} />
      <TanStackRouterDevtools />
    </>
  );
};
