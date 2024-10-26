import BookLayout from "../layout/BookLayout";
import Mindmap from "../container/mindmap";
import Paragraph from "../container/paragraph";
import ParagraphInput from "../container/paragraphInput";
import FixedBottomLayout from "../layout/FixedBottomLayout";
import OverflowScrollLayout from "../layout/OverflowScrollLayout";
import { Introduce } from "../subflow/main";
import DummyWrapper from "../components/common/DummyWrapper";

export default function () {
	return (
		<>
			<BookLayout
				left={<Mindmap />}
				right={
					<DummyWrapper className="paragraphElem">
						<FixedBottomLayout
							main={
								<OverflowScrollLayout divId="paragraph_div">
									<Paragraph />
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
					</DummyWrapper>
				}
			/>
		</>
	);
}

export const mindmapAndParagraphIntro = async () => {
	const introduce = new Introduce();
	await introduce.byPlainText([
		"<span><b>마인드맵</b>을 바탕으로 <b>단락</b>을 만드는 단계입니다.</span>",
		"<b>아이디어를 담은 문장</b>을 작성하면, GPT가 자동으로 내용을 더해&nbsp;<b>단락을 생성</b>합니다.",
	]);
	await introduce.byClassNamesAndDescriptions(
		["paragraphElem"],
		[
			[
				"<span>아이디어를 담은 문장을 만들어, [+] 클릭 혹은 엔터를 해보세요.<br/>GPT가 내용을 추가해 단락을 만들어 줍니다.</span>",
				"추가로, 드래그&드랍으로 단락의 순서를 바꿀 수 있습니다.",
				"또 단락을 클릭하여 단락 재생성, 수정, 삭제를 할 수도 있습니다.",
			],
		]
	);
	introduce.finish();
};
