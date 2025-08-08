import { Button } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";

import { isAdminQuery } from "@/client/helpers/api";
import { buttonSx } from "@/client/helpers/form";
import { useModal } from "@/client/hooks/useModal";
import type { TEvent } from "@/shared/types";

export const EventView = (event: TEvent) => {
  const { title, start, end, description } = event;

  const { editEvent, deleteEvent } = useModal();

  const { data: isAdmin } = useSuspenseQuery(isAdminQuery);

  return (
    <div className="modal-content">
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <p>
        {displayDate(start)} - {displayDate(end)}
      </p>
      {description && <p>{description}</p>}
      {isAdmin && (
        <div style={{ display: "flex", columnGap: "1rem", marginTop: "1rem" }}>
          <Button size="large" variant="contained" sx={buttonSx} onClick={() => editEvent(event)}>
            Edit
          </Button>
          <Button
            size="large"
            variant="contained"
            sx={{
              ...buttonSx,
              backgroundColor: "red",
            }}
            onClick={() => deleteEvent(event)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

const displayDate = (date: string) => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + 1);
  return dateObj.toLocaleDateString();
};
