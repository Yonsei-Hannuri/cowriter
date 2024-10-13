import FinalDraft from '../container/finalDraft';
import StackLayout from '../layout/StackLayout';
import { Introduce } from '../subflow/main';

export default function () {
  return (
    <StackLayout>
      <FinalDraft />
    </StackLayout>
  );
}

export const completeIntro = async () => {
  const introduce = new Introduce();
  await introduce.byPlainText(['멋진 댓거리가 완성되었습니다!']);
  introduce.finish();
};
