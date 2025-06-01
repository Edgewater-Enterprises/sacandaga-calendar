import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

export const Main = () => {
	return (
		<div style={{ padding: "1rem" }}>
			<h1>Sacandaga Calendar</h1>
			<FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
		</div>
	);
};
