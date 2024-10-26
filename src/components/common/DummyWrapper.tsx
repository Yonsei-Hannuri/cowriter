import { ReactElement } from "react";

export default function ({
	children,
	...props
}: {
	children: ReactElement;
	[key: string]: any;
}) {
	return (
		<div {...props} style={{ height: "inherit" }}>
			{children}
		</div>
	);
}
