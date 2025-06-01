export type TConfig = {
	PORT: number;
};

export type TAppContext = null;

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
