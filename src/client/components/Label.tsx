export const Label = ({
	children,
	error,
	htmlFor,
	isRequired
}: { children: React.ReactNode; error?: string; htmlFor?: string; isRequired?: boolean }) => {
	return (
		<label htmlFor={htmlFor}>
			{children}
			{isRequired && <span className="required">*</span>}
			{error && <span className="error">{error}</span>}
		</label>
	);
};
