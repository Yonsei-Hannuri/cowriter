import { ReactElement } from 'react';
import { Modal } from 'react-bootstrap';

export default function VerticallyCenteredModal({
  show,
  children,
  title = undefined,
  onHide = undefined,
}: {
  show: boolean;
  onHide?: () => void;
  children: ReactElement;
  title?: string | undefined;
}) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
