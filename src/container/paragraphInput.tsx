import InputTextAndAdd from '../components/paragraph/InputTextAndAdd';
import { useParagraph } from './store/paragraph';

export default function ({ onAdd }: { onAdd?: () => void }) {
  const { addParagraph } = useParagraph();
  return (
    <InputTextAndAdd
      onAdd={(paragraph) => {
        addParagraph(paragraph);
        if (onAdd) onAdd();
      }}
    />
  );
}
