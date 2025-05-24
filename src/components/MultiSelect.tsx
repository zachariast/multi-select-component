import { type FC } from 'react';
import { SearchField } from './SearchField';

interface Props {
  options: string[];
  selectedValues: string[];
}

export const MultiSelect: FC<Props> = ({ options, selectedValues }) => {
  return (
    <>
      <SearchField query='' />
      <div className="multi-select">
        <ul>
          {options.map((option, i) => (
            <li key={i}>
              <label>
                <input
                  type="checkbox"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MultiSelect;