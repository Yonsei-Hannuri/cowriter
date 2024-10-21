import BookLayout from "../layout/BookLayout";
import Mindmap from "../container/mindmap";
import Paragraph from "../container/paragraph";
import ParagraphInput from "../container/paragraphInput";
import FixedBottomLayout from "../layout/FixedBottomLayout";
import OverflowScrollLayout from "../layout/OverflowScrollLayout";
import { Introduce } from "../subflow/main";
export default function () {
	return (
		<>
			<BookLayout
				left={<Mindmap />}
				right={
					<div style={{ height: "100%" }} className="paragraphElem">
						<FixedBottomLayout
							main={
								<OverflowScrollLayout divId="paragraph_div">
									<>
										<Paragraph />
										<br />
										<br />
										<br />
										<br />
									</>
								</OverflowScrollLayout>
							}
							bottom={
								<ParagraphInput
									onAdd={() => {
										const $div = document.getElementById("paragraph_div");
										setTimeout(() => {
											if ($div)
												$div.scrollTo({
													top: $div.scrollHeight,
													behavior: "smooth",
												});
										}, 0);
									}}
								/>
							}
						/>
					</div>
				}
			/>
		</>
	);
}

export const mindmapAndParagraphIntro = async () => {
	const introduce = new Introduce();
	await introduce.byPlainText([
		"마인드맵을 바탕으로 문장을 작성하는 단계입니다.",
		"문장을 작성하면, GPT가 자동으로 내용을 더해 단락을 생성합니다.",
		"GPT와 함께 댓거리를 작성해보세요",
	]);
	await introduce.byClassNamesAndDescriptions(
		["paragraphElem"],
		[
			[
				"1. 드래그&드랍으로 단락의 순서를 바꿀 수 있습니다.",
				"2. 단락을 클릭하여, 단락 재생성, 수정, 삭제를 할 수 있습니다.",
			],
		]
	);
	introduce.finish();
};
