import { AppContext } from "@client/contexts/app";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	return <AppContext.Provider value={null}>{children}</AppContext.Provider>;
};
