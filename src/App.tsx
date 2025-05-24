import { useEffect } from "react"
import { useMultiSelectStore } from "./multiSelect/store/useMultiSelectStore"
import { MultiSelect } from "./multiSelect";

function App() {
  const { fetchOptions, filteredOptions, query, toggleSelected, selectedOptions, setQuery } = useMultiSelectStore()

  useEffect(() => {
    fetchOptions()
  }, [fetchOptions]);

  return (
    <>
      <div>
        <h1>bol</h1>
        <MultiSelect options={filteredOptions} selectedOptions={selectedOptions} onChange={toggleSelected} onSearch={setQuery} query={query} />
      </div>
    </>
  )
}

export default App
