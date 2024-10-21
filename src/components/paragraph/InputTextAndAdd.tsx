import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function ({
	onAdd,
	...props
}: {
	onAdd: (text: string) => void;
	[key: string]: any;
}) {
	const [input, setInput] = useState<string>("");
	const addOnEnter = (e: any) => {
		const { keyCode } = e;
		if (keyCode === 13) {
			setInput("");
			onAdd(input);
		}
	};
	return (
		<Container
			{...props}
			style={{
				padding: 0,
				display: "inline-flex",
				width: "100%",
				backgroundColor: "white",
				...props.style,
			}}
		>
			<Form.Control
				onChange={(e) => setInput(e.target.value)}
				value={input}
				type="text"
				as="textarea"
				rows={3}
				placeholder="Normal text"
				style={{
					width: "calc(100% - 40px)",
					resize: "none",
					boxShadow: "none",
				}}
				onKeyDown={addOnEnter}
			/>
			<Button
				variant="outline-secondary"
				onClick={() => {
					setInput("");
					onAdd(input);
				}}
				style={{ width: "40px" }}
			>
				+
			</Button>
		</Container>
	);
}
