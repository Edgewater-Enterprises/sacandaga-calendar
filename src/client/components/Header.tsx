import { useApp } from "@client/hooks/useApp";

export const Header = () => {
	const { addEvent } = useApp();

	return (
		<header className="header">
			<div />
			<button type="button" className="btn" onClick={addEvent}>
				new&nbsp;+
			</button>
		</header>
	);
};
