import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

export const Main = () => {
	return (
		<div style={{ padding: "1rem" }}>
			<h1>Sacandaga Calendar</h1>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				events={[{ title: "Test", date: "2025-06-02" }]}
				dateClick={date => console.log(date)}
				eventClick={event => console.log(event)}
			/>
		</div>
	);
};
