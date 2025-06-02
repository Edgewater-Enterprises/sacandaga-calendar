import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { useApi } from "@client/hooks/useApi";
import { useApp } from "@client/hooks/useApp";

export const Calendar = () => {
	const { events } = useApi();

	const { viewEvent } = useApp();

	return (
		<FullCalendar
			plugins={[dayGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			events={events.map(event => {
				const endDate = new Date(event.end);
				endDate.setDate(endDate.getDate() + 1);
				return {
					...event,
					end: endDate.toISOString().split("T")[0]
				};
			})}
			dateClick={date => console.log(date.dateStr)}
			eventClick={({ event: { id } }) => {
				const event = events.find(e => e.id === id);
				if (!event) throw new Error(`Event with id "${id}" not found`);
				viewEvent(event);
			}}
		/>
	);
};
