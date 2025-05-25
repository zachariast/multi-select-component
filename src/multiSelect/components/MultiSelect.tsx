import { useMemo, type FC } from 'react';
import { SearchField } from './SearchField';
import OptionsList from './OptionsList';
import { nl } from '../locales';

interface Props {
  options: string[];
  selectedOptions: string[];
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  query: string;
  isLoading: boolean;
}

/**
 * MultiSelect Component
 * 
 * A customizable selection component that allows users to search, select,
 * and deselect multiple options from a provided list.
 * 
 * @param {Props} props - Component props
 * @returns {JSX.Element} Rendered MultiSelect component
 */
export const MultiSelect: FC<Props> = ({ options, selectedOptions, onChange, onSearch, query, isLoading }) => {
  /**
   * Compute the list of available options by filtering out already selected options.
   * Set was used here for efficient lookup performance when filtering
   */
  const availableOptions = useMemo(() => {
    const selectedSet = new Set(selectedOptions);
    return options.filter(option => !selectedSet.has(option));
  }, [options, selectedOptions]);

  return (
    <div>
      <div
        className="multi-select-content"
        role="group"
      >
        <h3 className="filter-title">
          {nl.product_group}
        </h3>

        <SearchField query={query} onSearch={onSearch} />

        <div className='options-container'>
          {isLoading ? (
            <div className="loading">{nl.loading}</div>
          ) : (
            <>
              {/* Display selected options section if any options are selected */}
              {selectedOptions.length > 0 && (
                < OptionsList options={selectedOptions} checked onChange={onChange} />
              )}
              <OptionsList options={availableOptions} onChange={onChange} />
            </>
          )}
        </div>

      </div>
      <button className="confirm-button">{nl.apply}</button>
    </div>
  );
};

export default MultiSelect;