import { buttonSx } from "@client/helpers/form";
import { useAuth } from "@client/hooks/useAuth";
import { useModal } from "@client/hooks/useModal";
import { Button } from "@mui/material";
import type { TEvent } from "@shared/types";

export const EventView = (event: TEvent) => {
  const { title, start, end, description } = event;

  const { editEvent, deleteEvent } = useModal();

  const { isAdmin } = useAuth();

  return (
    <div className="modal-content">
      <h1>{title}</h1>
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
