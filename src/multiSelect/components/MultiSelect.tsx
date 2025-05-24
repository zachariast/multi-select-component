import { useMemo, type FC } from 'react';
import { SearchField } from './SearchField';
import OptionsList from './OptionsList';
import { useMultiSelectStore } from '../store/useMultiSelectStore';
import { nl } from '../locales';

interface Props {
  options: string[];
  selectedOptions: string[];
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  query: string;
}

export const MultiSelect: FC<Props> = ({ options, selectedOptions, onChange, onSearch, query }) => {
  const isLoading = useMultiSelectStore(state => state.isLoading);

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
              {selectedOptions.length > 0 && (
                <OptionsList options={selectedOptions} checked onChange={onChange} />
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