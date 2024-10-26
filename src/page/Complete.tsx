import FinalDraft from "../container/finalDraft";
import StackLayout from "../layout/StackLayout";
import { Introduce } from "../subflow/main";

export default function () {
	return (
		<StackLayout>
			<FinalDraft />
		</StackLayout>
	);
}

export const completeIntro = async () => {
	const introduce = new Introduce();
	await introduce.byPlainText([
		"<span><b>멋진 에세이</b>가&nbsp;<b>완성</b>되었습니다!</span>",
	]);
	introduce.finish();
};
