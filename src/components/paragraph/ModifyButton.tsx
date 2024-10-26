import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import VerticallyCenteredModal from "./VerticallyCenteredModal";

export default function ({
	onModify,
	initialContent,
}: {
	onModify: (command: string) => void;
	initialContent: string;
}) {
	const [showModifyModal, setShowModifyModal] = useState(false);
	const [content, setContent] = useState("");
	return {
		Button: (
			<>
				<Button
					className="m-1"
					onClick={() => {
						setShowModifyModal(true);
						setContent(initialContent);
					}}
					style={{
						cursor: "pointer",
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-pencil-fill"
						viewBox="0 0 16 16"
					>
						<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
					</svg>
				</Button>
			</>
		),
		Modal: (
			<VerticallyCenteredModal
				show={showModifyModal}
				title={"단락 수정"}
				onHide={() => setShowModifyModal(false)}
			>
				<>
					<Form.Control
						as="textarea"
						style={{ height: "400px" }}
						value={content}
						onChange={(e) => setContent(e.target.value)}
						onKeyDown={(e: any) => {
							e.stopPropagation();
							const { keyCode } = e;
							if (keyCode === 13) {
								e.preventDefault();
								onModify(content);
								setShowModifyModal(false);
							}
						}}
						autoFocus
					/>
					<br />
					<div className="d-flex justify-content-end">
						<Button
							onClick={() => {
								onModify(content);
								setShowModifyModal(false);
							}}
						>
							수정 완료
						</Button>
					</div>
				</>
			</VerticallyCenteredModal>
		),
	};
}
