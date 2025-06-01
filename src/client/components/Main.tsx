import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

export const Main = () => {
	return (
		<div style={{ padding: "1rem" }}>
			<FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
		</div>
	);
};
