import BookLayout from "../layout/BookLayout";
import Mindmap from "../container/mindmap";
import Subject from "../container/subject";
import { Introduce } from "../subflow/main";
import DummyWrapper from "../components/common/DummyWrapper";

export default function () {
	return (
		<>
			<BookLayout
				left={
					<DummyWrapper className="subjectElem">
						<Subject />
					</DummyWrapper>
				}
				right={
					<DummyWrapper className="mindmapElem">
						<Mindmap />
					</DummyWrapper>
				}
			/>
		</>
	);
}

export const subjectAndMindmapIntro = async () => {
	const introduce = new Introduce();
	await introduce.byPlainText([
		"<span><b>주제</b>를 읽고 &nbsp;<b>마인드맵</b>을 그려보세요</span>",
		"에세이 작성을 위한 브레인 스토밍을 하는 단계입니다.",
		"<span>주제를 보고 생각나는&nbsp;<b>단어, 개념, 기억</b>들을 자유롭게&nbsp;<b>마인드맵</b>에 적고, 관련된 것들끼리 연결해보세요</span>",
	]);
	await introduce.byClassNamesAndDescriptions(
		["subjectElem", "mindmapElem"],
		[
			["에세이의 주제를 제시하는 부분입니다."],
			[
				"마인드맵 입니다",
				"단어를 추가, 이동, 연결, 삭제 할 수 있습니다.",
				"A, M, C, D 키를 활용하여 모드를 쉽게 변경할 수 있습니다.",
				"A(추가) 키를 누르고, 단어를 놓고 싶은 위치를 클릭해보세요!",
			],
		]
	);
	introduce.finish();
};
