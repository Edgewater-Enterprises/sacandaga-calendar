import type { TEvent } from "@shared/types";

export const EventView = (event: TEvent) => {
	const { title, start, end, description } = event;

	return (
		<div className="event-view">
			<h1>{title}</h1>
			<p>
				{displayDate(start)} - {displayDate(end)}
			</p>
			{description && <p>{description}</p>}
		</div>
	);
};

const displayDate = (date: string) => {
	const dateObj = new Date(date);
	dateObj.setDate(dateObj.getDate() + 1);
	return dateObj.toLocaleDateString();
};
