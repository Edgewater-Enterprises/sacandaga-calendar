import { Modal as MuiModal, Zoom } from "@mui/material";
import { useEffect, useState } from "react";

import { useModal } from "@/client/hooks/useModal";

export const Modal = ({ onClose }: { onClose?: () => void }) => {
  const [isZoomed, setIsZoomed] = useState(true);

  const { isOpen, modalContent, closeModal, clearModal } = useModal();

  useEffect(() => {
    if (isOpen) return;
    setIsZoomed(false);
    const timeout = setTimeout(() => {
      onClose?.();
      clearModal();
      setIsZoomed(true);
    }, 150);
    return () => clearTimeout(timeout);
  }, [isOpen, onClose, clearModal]);

  return (
    <MuiModal open={!!modalContent} onClose={closeModal} disableScrollLock>
      <div className="absolute-centered" style={{ borderRadius: "50%", outline: "none" }}>
        <Zoom in={isZoomed}>
          <div style={{ borderRadius: "50%" }}>{modalContent}</div>
        </Zoom>
      </div>
    </MuiModal>
  );
};
