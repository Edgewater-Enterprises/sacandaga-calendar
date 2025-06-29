import { useModal } from "@client/hooks/useModal";
import { Button } from "@mui/material";
import type { TEvent } from "@shared/types";

export const EventView = (event: TEvent) => {
  const { title, start, end, description } = event;

  const { editEvent } = useModal();

  return (
    <div className="modal-content">
      <h1>{title}</h1>
      <p>
        {displayDate(start)} - {displayDate(end)}
      </p>
      {description && <p>{description}</p>}
      <div style={{ display: "flex", columnGap: "1rem", marginTop: "1rem" }}>
        <Button
          size="large"
          variant="contained"
          sx={{
            fontSize: "1.25rem",
            padding: "0.5rem 2rem",
            width: "10rem",
          }}
          onClick={() => editEvent(event)}
        >
          Edit
        </Button>
        <Button
          size="large"
          variant="contained"
          sx={{
            fontSize: "1.25rem",
            padding: "0.5rem 2rem",
            backgroundColor: "red",
            width: "10rem",
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const displayDate = (date: string) => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + 1);
  return dateObj.toLocaleDateString();
};
