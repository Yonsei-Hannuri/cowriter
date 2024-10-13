import { Col, Row } from 'react-bootstrap';

export default function ({
  left,
  right,
}: {
  left: React.JSX.Element;
  right: React.JSX.Element;
}) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'inline-flex' }}>
      <div className="w-50 p-3 border bg-white rounded h-100">{left}</div>
      <div className="w-50 p-3 border bg-white rounded h-100">{right}</div>
    </div>
  );
}
