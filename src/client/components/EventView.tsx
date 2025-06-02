import type { TEvent } from "@shared/types";

export const EventView = (event: TEvent) => {
	const { title, start, end, description } = event;

	const startDateObj = new Date(start);
	startDateObj.setDate(startDateObj.getDate() + 1);
	const startDate = startDateObj.toLocaleDateString();
	const endDate = new Date(end).toLocaleDateString();

	return (
		<div className="event-view">
			<h1>{title}</h1>
			<p>
				{startDate} - {endDate}
			</p>
			{description && <p>{description}</p>}
		</div>
	);
};
