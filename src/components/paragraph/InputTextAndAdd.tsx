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
				placeholder="Normal text"
				style={{ width: "calc(100% - 40px)" }}
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
