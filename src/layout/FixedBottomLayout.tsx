export default function ({
	main,
	bottom,
}: {
	main: React.JSX.Element;
	bottom: React.JSX.Element;
}) {
	return (
		<div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
			<div style={{ height: "calc(100% - 88px)" }}>{main}</div>
			<div style={{ height: "88px" }}>{bottom}</div>
		</div>
	);
}
