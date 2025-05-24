import { useEffect } from "react"
import MultiSelect from "./components/MultiSelect"
import { useMultiSelectStore } from "./store/useMultiSelectStore"

function App() {
  const { fetchOptions, options } = useMultiSelectStore()

  useEffect(() => {
    fetchOptions()
  }, [fetchOptions]);

  return (
    <>
      <div>
        <h1>bol</h1>
        <MultiSelect options={options} selectedValues={[]} />
      </div>
    </>
  )
}

export default App
