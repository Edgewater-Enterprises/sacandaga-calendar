import { useApp } from "@client/hooks/useApp";

export const Header = () => {
	const { openAddEventModal } = useApp();

	return (
		<div className="header">
			<div />
			<button type="button" className="btn" onClick={() => openAddEventModal()}>
				new&nbsp;+
			</button>
		</div>
	);
};
