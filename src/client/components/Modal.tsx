import { useModal } from "@client/hooks/useModal";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal as MuiModal, Zoom } from "@mui/material";
import type { TModalProps } from "@shared/types";
import { useEffect, useState } from "react";

export const Modal = ({ onClose, showCloseBtn = true }: TModalProps) => {
  const [isZoomed, setIsZoomed] = useState(true);

  const { modalContent, closeModal } = useModal();

  useEffect(() => {
    if (isZoomed) return;
    const timeout = setTimeout(() => {
      onClose?.();
      closeModal();
      setIsZoomed(true);
    }, 150);
    return () => clearTimeout(timeout);
  }, [onClose, closeModal, isZoomed]);

  const onRequestClose = () => setIsZoomed(false);

  return (
    <MuiModal open={!!modalContent} onClose={onRequestClose} disableScrollLock>
      <div className="absolute-centered" style={{ borderRadius: "50%", outline: "none" }}>
        <Zoom in={isZoomed}>
          <div style={{ position: "relative", borderRadius: "50%" }}>
            {showCloseBtn && (
              <IconButton
                className="icon-btn"
                aria-label="Close"
                onClick={onRequestClose}
                sx={{ width: "3rem", height: "3rem", color: "inherit" }}
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  zIndex: 1000,
                }}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            )}
            {modalContent}
          </div>
        </Zoom>
      </div>
    </MuiModal>
  );
};
