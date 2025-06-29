import { Modal } from "@client/components/Modal";
import { useModal } from "@client/hooks/useModal";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const { modalContent, modalProps } = useModal();

  return (
    <>
      <main className="layout">
        <Outlet />
      </main>
      <Modal {...modalProps}>{modalContent}</Modal>
      <Toaster toastOptions={{ duration: 4000 }} />
    </>
  );
};
