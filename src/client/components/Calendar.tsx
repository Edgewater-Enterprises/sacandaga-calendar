import { useApi } from "@client/hooks/useApi";
import { useAuth } from "@client/hooks/useAuth";
import { useModal } from "@client/hooks/useModal";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

export const Calendar = () => {
  const { events } = useApi();

  const { isAdmin } = useAuth();

  const { viewEvent, addEvent } = useModal();

  const calendarEvents = events.map(event => {
    const endDate = new Date(event.end);
    endDate.setDate(endDate.getDate() + 1);
    return {
      ...event,
      end: endDate.toISOString().split("T")[0],
      backgroundColor: event.background_color,
    };
  });

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="100%"
        events={calendarEvents}
        dateClick={({ dateStr }) => {
          if (!isAdmin) return;
          addEvent(dateStr);
        }}
        eventClick={({ event: { id } }) => {
          if (!isAdmin) return;
          const event = events.find(e => e.id === id);
          if (!event) throw new Error(`Event with id "${id}" does not exist`);
          viewEvent(event);
        }}
      />
    </div>
  );
};
