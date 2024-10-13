import EssayList from '../container/essayList';
import StackLayout from '../layout/StackLayout';
import { useHistory } from 'react-router-dom';

export default function () {
  const history = useHistory();
  return (
    <StackLayout>
      <EssayList
        onEssayClick={(essay) => {
          history.push({
            pathname: '/detgoriHelper/write',
            search: `?type=update&essayId=${essay.essayId}&subjectId=${essay.subjectId}`,
          });
        }}
      />
    </StackLayout>
  );
}
