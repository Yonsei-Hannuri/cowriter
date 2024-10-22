import { ReactElement, useState } from "react";

export default function ({
	children,
	onDragEnd,
	...props
}: {
	children: ReactElement[];
	onDragEnd: (fromIndex: number, toIndexBefore: number) => void;
	[key: string]: any;
}) {
	const [fromIndex, setFromIndex] = useState(-1);
	const [toIndexBefore, setToIndexBefore] = useState(-1);

	return (
		<div
			onDragEnd={(e) => {
				e.preventDefault();
				onDragEnd(fromIndex, toIndexBefore);
				setFromIndex(-1);
				setToIndexBefore(-1);
			}}
			{...props}
		>
			{children.map((child, idx) => (
				<div key={idx}>
					<div
						style={{
							height: 18,
							backgroundColor: idx === toIndexBefore ? "#C1D5F0" : "",
						}}
						onDragEnter={(e) => {
							e.preventDefault();
							setToIndexBefore(idx);
						}}
						onDragLeave={(e) => {
							e.preventDefault();
							setToIndexBefore(-1);
						}}
						onDragOver={(e) => {
							e.preventDefault();
							e.dataTransfer.dropEffect = "move";
						}}
					/>
					<div
						draggable
						onDragStart={() => {
							setFromIndex(idx);
							setToIndexBefore(-1);
						}}
					>
						{child}
					</div>
				</div>
			))}
			<div
				style={{
					height: 18,
					backgroundColor: children.length === toIndexBefore ? "#C1D5F0" : "",
				}}
				onDragEnter={(e) => {
					e.preventDefault();
					setToIndexBefore(children.length);
				}}
				onDragLeave={(e) => {
					e.preventDefault();
					setToIndexBefore(-1);
				}}
				onDragOver={(e) => {
					e.preventDefault();
					e.dataTransfer.dropEffect = "move";
				}}
			/>
		</div>
	);
}
