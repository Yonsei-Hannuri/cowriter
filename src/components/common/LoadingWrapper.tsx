import { ReactElement } from 'react';

export default function ({
  children,
  isLoading,
  ...props
}: {
  children: ReactElement;
  isLoading: boolean;
  [key: string]: any;
}) {
  if (isLoading) {
    return (
      <div
        {...props}
        style={{
          position: 'relative',
          display: 'flex',
          ...props.style,
        }}
      >
        {children}
        <div
          className="rounded"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'lightgray',
            opacity: 0.6,
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            left: 0,
            right: 0,
            margin: 'auto',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </div>
    );
  }
  return children;
}
