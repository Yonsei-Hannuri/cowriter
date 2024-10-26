import InputTextAndAdd from "../components/paragraph/InputTextAndAdd";
import { useParagraph } from "./store/paragraph";

export default function ({ onAdd }: { onAdd?: () => void }) {
	const { addParagraph } = useParagraph();
	return (
		<InputTextAndAdd
			onAdd={(paragraph) => {
				addParagraph(paragraph);
				if (onAdd) onAdd();
			}}
			placeHolder="단어를 연결해 아이디어를 만들어주세요."
		/>
	);
}
