import { useState } from 'react';
import { Toast } from 'react-bootstrap';
import CommandButton from './CommandButton';
import ModifyButton from './ModifyButton';
import RemoveButton from './RemoveButton';
import LoadingWrapper from '../common/LoadingWrapper';

export default function ({
  paragraph,
  onCommand,
  onModify,
  onRemove,
  isLoading = false,
}: {
  paragraph: { content: string };
  onCommand: (command: string) => void;
  onModify: (modified: string) => void;
  onRemove: () => void;
  isLoading?: boolean;
}) {
  const [show, setShow] = useState(false);

  const { Button: ModifyB, Modal: ModifyM } = ModifyButton({
    onModify,
    initialContent: paragraph.content,
  });

  const { Button: CommandB, Modal: CommandM } = CommandButton({
    onCommand,
  });

  return (
    <div style={{ position: 'relative' }} onClick={() => setShow(true)}>
      <div className="rounded p-3 border">{paragraph.content}</div>
      <Toast
        style={{
          position: 'absolute',
          border: 0,
          boxShadow: 'unset',
          width: 'fit-content',
          right: 5,
          top: 5,
          backgroundColor: 'unset',
        }}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        {CommandB}
        {ModifyB}
        <RemoveButton onRemoveClick={onRemove} />
      </Toast>
      {CommandM}
      {ModifyM}
    </div>
  );
}