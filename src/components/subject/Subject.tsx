import PDFViewer from "./PDFViewer";

export default function ({
	subjectTitle,
	subjectContent,
}: {
	subjectTitle: string;
	subjectContent: string;
}) {
	const contents = JSON.parse(subjectContent ? subjectContent : "{}");
	const pdf = contents.attatchments?.pdf[0];
	return (
		<div style={{ height: "100%" }}>
			<h2>{subjectTitle}</h2>
			{pdf && <PDFViewer src={pdf} />}
		</div>
	);
}
