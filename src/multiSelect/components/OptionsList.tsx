import { type FC } from 'react';

interface Props {
  options: string[];
  onChange: (value: string) => void;
  checked?: boolean;
}

export const OptionsList: FC<Props> = ({ options, onChange, checked = false }) => {
  return (
    <ul aria-label="Selectable options" aria-multiselectable="true" className="options-list">
      {options.map((option, i) => (
        <li key={i} aria-selected={checked}>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onChange(option)}
              aria-label={`${checked ? 'Remove' : 'Select'} ${option}`}
            />
            <span>
              {option}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default OptionsList;