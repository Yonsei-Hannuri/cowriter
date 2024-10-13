import { Button } from 'react-bootstrap';

export default function ({
  onRemoveClick,
}: {
  onRemoveClick: (e: any) => void;
}) {
  return (
    <Button
      className="m-1"
      onClick={onRemoveClick}
      style={{
        cursor: 'pointer',
      }}
    >
      <span aria-hidden="true">&times;</span>
    </Button>
  );
}
