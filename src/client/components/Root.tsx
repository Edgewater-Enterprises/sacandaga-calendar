import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";

import { Modal } from "@/client/components/Modal";

export const Root = () => {
  return (
    <>
      <Outlet />
      <Modal />
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            background: "#2c3e50",
            color: "#ffffff",
            border: "1px solid #3a4155",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.4)",
            fontSize: "0.95rem",
          },
          success: {
            iconTheme: {
              primary: "#4CAF50",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4b4b",
              secondary: "#ffffff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#3498db",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <TanStackRouterDevtools />
    </>
  );
};
