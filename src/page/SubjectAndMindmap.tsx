import BookLayout from '../layout/BookLayout';
import Mindmap from '../container/mindmap';
import Subject from '../container/subject';
import { Introduce } from '../subflow/main';

export default function () {
  return (
    <>
      <BookLayout
        left={<Subject />}
        right={
          <div style={{ height: '100%' }} className="mindmapElem">
            <Mindmap />
          </div>
        }
      />
    </>
  );
}

export const subjectAndMindmapIntro = async () => {
  const introduce = new Introduce();
  await introduce.byPlainText([
    '주제를 읽고 마인드맵을 그려보세요',
    '댓거리 작성을 위한 브레인 스토밍을 하는 단계입니다.',
    '주제를 보고 생각나는 단어, 개념, 기억들을 자유롭게 마인드 맵에 적고, 관련된 것들끼리 연결해보세요',
  ]);
  introduce.finish();
};
