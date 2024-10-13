export default function ({
  main,
  bottom,
}: {
  main: React.JSX.Element;
  bottom: React.JSX.Element;
}) {
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      {main}
      <div style={{ position: 'absolute', width: '100%', bottom: 0 }}>
        {bottom}
      </div>
    </div>
  );
}
