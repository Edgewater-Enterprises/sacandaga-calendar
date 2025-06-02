export type TConfig = {
	PORT: number;
};

export type TAppContext = null;

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type TEvent = {
	id: string;
	title: string;
	description?: string;
	start: string;
	end: string;
};

export type TAddEvent = Omit<TEvent, "id">;
