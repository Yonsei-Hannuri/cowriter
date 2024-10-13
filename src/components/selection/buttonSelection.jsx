import { Button } from 'react-bootstrap';

export default function ButtonSelection({ options, onClickOption, selected }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onClickOption(option)}
          className={selected.includes(option) ? 'selected rounded' : 'rounded'}
          style={{
            padding: '3px 8px',
            margin: '5px',
            border: 'none',
            color: selected.includes(option) ? 'red' : 'black',
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
