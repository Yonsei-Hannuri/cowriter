import { useEffect, useState } from "react";
import SubjectAndMindmap from "./page/SubjectAndMindmap";
import MindmapAndParagraph from "./page/MindmapAndParagraph";
import TitleAndParagraph from "./page/TitleAndParagraph";
import Complete from "./page/Complete";
import { Button, Container, Modal } from "react-bootstrap";
import { subjectAndMindmapIntro } from "./page/SubjectAndMindmap";
import { mindmapAndParagraphIntro } from "./page/MindmapAndParagraph";
import { titleAndParagraphIntro } from "./page/TitleAndParagraph";
import { completeIntro } from "./page/Complete";
import { useMindmap } from "./container/store/mindmap";
import { useParagraph } from "./container/store/paragraph";
import { useTitle } from "./container/store/title";
import { CREATE_ESSAY, GET_ESSAY, GET_RECENT_SUBJECT_ESSAY } from "./api/essay";
import { useHistory } from "react-router-dom";
// import { useEssay } from "./container/store/essay";
import EssayList from "./container/essayList";
import { GET_SUBJECT } from "./api/subject";
import { useSubject } from "./container/store/subject";
import fileDownload from "./utils/fileDownload";
import getNewlineCharacter from "./utils/getNewlineCharacter";

const pages = [
	<SubjectAndMindmap />,
	<MindmapAndParagraph />,
	<TitleAndParagraph />,
	<Complete />,
];

const intros = [
	subjectAndMindmapIntro,
	mindmapAndParagraphIntro,
	titleAndParagraphIntro,
	completeIntro,
];

export default function () {
	const history = useHistory();
	const [page, setPage] = useState<number>(0);
	// const { fetch: fetchEssay } = useEssay();
	const { fetch: fetchMindmap } = useMindmap();
	const { fetch: fetchSubject } = useSubject();
	const { fetch: fetchParagraph, paragraphs } = useParagraph();
	const { fetch: fetchTitle, title } = useTitle();

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		(async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const type = urlParams.get("type");
			//const essays = fetchEssay();

			if (type === "create") {
				const _subjectId = urlParams.get("subjectId");
				const _subjectUrl = urlParams.get("subjectInfoUrl");
				if (!_subjectId || !_subjectUrl) return;

				const {
					data: { subjectId },
				} = await GET_SUBJECT(_subjectId, _subjectUrl);

				const { data: recentSubjectEssays } = await GET_RECENT_SUBJECT_ESSAY(
					subjectId
				);

				let continueWriting = false;
				if (recentSubjectEssays.length > 0) {
					continueWriting = window.confirm(
						"이 주제에 작성 중이던 에세이가 있습니다. 이어서 작성하시겠습니까?"
					);
				}
				if (continueWriting) {
					const { essayId } = recentSubjectEssays[0];
					console.log(essayId);
					fetchMindmap(essayId);
					fetchParagraph(essayId);
					fetchTitle(essayId);
					fetchSubject(subjectId);
				} else {
					await CREATE_ESSAY(subjectId).then((e) => {
						const { essayId } = e.data;
						fetchMindmap(essayId);
						fetchParagraph(essayId);
						fetchTitle(essayId);
						fetchSubject(subjectId);
					});
				}
			} else if (type === "update") {
				const _essayId = Number(urlParams.get("essayId"));
				const {
					data: { essayId, subjectId },
				} = await GET_ESSAY(_essayId);
				fetchMindmap(essayId);
				fetchParagraph(essayId);
				fetchTitle(essayId);
				fetchSubject(subjectId);
			}
		})();
	}, []);
	return (
		<Container
			className="p-3 d-flex flex-column"
			style={{ backgroundColor: "#B6D0E2", height: "100%", overflow: "hidden" }}
		>
			<div
				style={{
					height: "5%",
					display: "flex",
					justifyContent: "flex-end",
					padding: "5px",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						flexDirection: "row",
						flexGrow: 1,
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						fill="currentColor"
						viewBox="0 0 16 16"
						onClick={handleShow}
						style={{ cursor: "pointer", transform: "translate(0, -3px)" }}
					>
						<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
						<path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
					</svg>
					<div style={{ width: "10px" }}></div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						className="bi bi-question-circle"
						viewBox="0 0 16 16"
						onClick={() => {
							intros[page]();
						}}
						style={{ cursor: "pointer" }}
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
						<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
					</svg>
				</div>
				<button
					style={{
						border: "none",
						borderRadius: "30px",
						marginRight: "5px",
					}}
					onClick={() => {
						if (page === 0) {
							history.push({ pathname: "/" });
						}
						setPage((prev) => {
							if (prev === 0) return 0;
							else return prev - 1;
						});
					}}
				>
					{page === 0 ? "나가기" : "이전"}
				</button>
				<button
					style={{ border: "none", borderRadius: "30px" }}
					onClick={() => {
						if (page === 3) {
							const essayTitle = title;
							const blob = new Blob(
								[
									paragraphs
										.map((e) => e.content)
										.join(getNewlineCharacter() + getNewlineCharacter()),
								],
								{ type: "text/plain" }
							);
							fileDownload(blob, essayTitle);
							return;
						}
						setPage((prev) => {
							return prev + 1;
						});
					}}
				>
					{page === 3 ? "완료" : "다음"}
				</button>
			</div>
			<div style={{ height: "95%" }}>
				{pages.map((p, idx) => {
					return (
						<div
							style={{ height: "100%", display: idx === page ? "" : "none" }}
							key={idx}
						>
							{p}
						</div>
					);
				})}
			</div>
			<Modal show={show} onHide={handleClose} size="lg" scrollable={true}>
				<Modal.Header closeButton>
					<Modal.Title>저장된 에세이</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EssayList
						onEssayClick={(e) => {
							console.log(e);
						}}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}
