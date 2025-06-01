import { Calendar } from "@client/components/Calendar";
import { Header } from "@client/components/Header";

export const Main = () => {
	return (
		<div style={{ padding: "1rem" }}>
			<Header />
			<Calendar />
		</div>
	);
};
