import { Header } from "@client/components/Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
			<Header />
			<main style={{ flex: 1, overflowY: "auto" }}>{children}</main>
		</div>
	);
};
