import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function ({
  lines,
  buttons,
}: {
  lines: { text: string; selected: boolean }[];
  buttons: {
    name: string;
    handler: (line: string) => void;
  }[];
}) {
  return (
    <Container>
      {lines.map((line) => (
        <Row key={line.text}>
          <Col>
            <Form.Text
              style={{ padding: 6, color: line.selected ? 'red' : '' }}
            >
              {line.text}
            </Form.Text>
          </Col>
          <Col style={{ padding: 0 }}>
            {buttons.map((button) => (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  button.handler(line.text);
                }}
              >
                {button.name}
              </Button>
            ))}
          </Col>
        </Row>
      ))}
    </Container>
  );
}
