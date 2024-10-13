export default function ({
  children,
  divId,
}: {
  children: React.JSX.Element;
  divId?: string;
}) {
  return (
    <div
      id={divId ? divId : 'DUMMYNAME'}
      style={{ height: '100%', overflow: 'scroll' }}
    >
      {children}
    </div>
  );
}
