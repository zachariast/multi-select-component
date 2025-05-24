import { useMemo, type FC } from 'react';
import { SearchField } from './SearchField';
import OptionsList from './OptionsList';
import { useMultiSelectStore } from '../store/useMultiSelectStore';

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
    <div
      className="multi-select-container"
      role="group"
    >
      <SearchField query={query} onSearch={onSearch} />
      <div className="multi-select">
        {isLoading ? (
          <div className="loading">Loading options...</div>
        ) : (
          <>
            {selectedOptions.length > 0 && (
              <div className="selected-values">
                <OptionsList options={selectedOptions} checked onChange={onChange} />
              </div>
            )}
            <OptionsList options={availableOptions} onChange={onChange} />
          </>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;