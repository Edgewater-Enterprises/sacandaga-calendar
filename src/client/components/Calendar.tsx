import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { useApi } from "@client/hooks/useApi";

export const Calendar = () => {
	const { events } = useApi();

	return (
		<FullCalendar
			plugins={[dayGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			events={events}
			dateClick={date => console.log(date.dateStr)}
			eventClick={({ event: { id } }) => {
				const event = events.find(e => e.id === id);
				console.log(event);
			}}
		/>
	);
};
