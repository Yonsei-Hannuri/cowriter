import { useParagraph } from './store/paragraph';
import { useTitle } from './store/title';

export default function () {
  const { title } = useTitle();
  const { paragraphs } = useParagraph();
  return (
    <>
      <h3>{title}</h3>
      <br />
      {paragraphs.map((paragraph) => (
        <>
          <p>{paragraph.content}</p>
        </>
      ))}
    </>
  );
}
