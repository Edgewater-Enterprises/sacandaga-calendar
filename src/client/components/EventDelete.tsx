import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { api } from "@/client/helpers/api";
import { buttonSx } from "@/client/helpers/form";
import { useModal } from "@/client/hooks/useModal";
import type { TEvent } from "@/shared/types";

export const EventDelete = ({ id, title }: TEvent) => {
  const { closeModal } = useModal();

  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: async () => await api.deleteEvent(id),
    onSuccess: async () => {
      closeModal();
      toast.success("Stay deleted");
    },
    onError: error => toast.error(error.message),
    onSettled: async () => await api.invalidateEvents(),
  });

  return (
    <div className="modal-content">
      <h1>Delete Stay</h1>
      <p>{title}</p>
      <p>Are you sure you want to delete this stay?</p>
      <div style={{ display: "flex", columnGap: "1rem", marginTop: "1rem" }}>
        <Button
          size="large"
          variant="outlined"
          sx={buttonSx}
          disabled={isPending}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{ backgroundColor: "red", ...buttonSx }}
          disabled={isPending}
          onClick={() => handleDelete()}
        >
          {isPending ? <CircularProgress sx={{ color: "white" }} size={36} /> : "Delete"}
        </Button>
      </div>
    </div>
  );
};
