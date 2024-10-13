import { ReactElement } from 'react';
import { Container } from 'react-bootstrap';

export default function ({
  children,
  ...props
}: {
  children: ReactElement | ReactElement[];
  [key: string]: any;
}) {
  return (
    <Container
      {...props}
      className="bg-white h-100 overflow-scroll p-3 rounded"
    >
      {children}
    </Container>
  );
}
