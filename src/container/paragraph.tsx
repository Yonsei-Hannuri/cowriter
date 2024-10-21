import Paragraph from "../components/paragraph/Paragraph";
import DraggableOrdering from "../components/paragraph/DraggableOrdering";
import { useParagraph } from "./store/paragraph";
import LoadingWrapper from "../components/common/LoadingWrapper";

export default function () {
	const {
		paragraphs,
		loading,
		removeParagraph,
		changeOrder,
		regenerateParagraph,
		modifyParagraph,
	} = useParagraph();
	return (
		<LoadingWrapper isLoading={loading} style={{ height: "inherit" }}>
			<DraggableOrdering
				onDragEnd={(fromIndex, toIndexBefore) => {
					if (toIndexBefore === -1 || fromIndex === -1) return;
					changeOrder(paragraphs[fromIndex].id, toIndexBefore);
				}}
			>
				{paragraphs.map((p, idx) => (
					<LoadingWrapper isLoading={p.loading} style={{ height: "inherit" }}>
						<Paragraph
							key={idx}
							paragraph={{
								content: p.content,
							}}
							onRemove={() => removeParagraph(p.id)}
							onCommand={(command) => regenerateParagraph(p.id, command)}
							onModify={(modified) => modifyParagraph(p.id, modified)}
						/>
					</LoadingWrapper>
				))}
			</DraggableOrdering>
		</LoadingWrapper>
	);
}
