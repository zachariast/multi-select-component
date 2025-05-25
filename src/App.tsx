import { useEffect } from "react"
import { MultiSelect, useMultiSelectStore } from "./multiSelect";

function App() {
  const { fetchOptions, filteredOptions, query, toggleSelected, selectedOptions, setQuery, isLoading } = useMultiSelectStore()

  useEffect(() => {
    fetchOptions()
  }, [fetchOptions]);

  return (
    <div className="multi-select-container">
      <MultiSelect options={filteredOptions} selectedOptions={selectedOptions} onChange={toggleSelected} onSearch={setQuery} query={query} isLoading={isLoading} />
    </div>
  )
}

export default App
