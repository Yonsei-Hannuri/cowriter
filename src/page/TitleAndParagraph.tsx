import Paragraph from "../container/paragraph";
import Title from "../container/title";
import StackLayout from "../layout/StackLayout";
import { Introduce } from "../subflow/main";
export default function () {
	return (
		<StackLayout>
			<Title />
			<Paragraph />
		</StackLayout>
	);
}

export const titleAndParagraphIntro = async () => {
	const introduce = new Introduce();
	await introduce.byPlainText([
		"<span><b>에세이</b>에 어울리는 <b>제목</b>을 만들어보세요.<span>",
		"GPT가&nbsp;<b>자동으로 제목을 추천</b>해줍니다.",
		"제목을 직접 바꾸거나, GPT버튼을 눌러 새로운 제목을 추천받을 수도 있습니다.",
	]);
	introduce.finish();
};
