import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { useApi } from "@client/hooks/useApi";

export const Main = () => {
	const { events } = useApi();

	return (
		<div style={{ padding: "1rem" }}>
			<h1>Sacandaga Calendar</h1>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				events={events}
				dateClick={date => console.log(date)}
				eventClick={event => console.log(event)}
			/>
		</div>
	);
};
