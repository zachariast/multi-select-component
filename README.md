# Multi-Select Component

A reusable and customizable multi-select dropdown component built with React, TypeScript, and Zustand. This component allows users to search, select, and deselect multiple options from a list that we fetched from an "API".

I chose a feature-specific approach when designing the project's structure, assuming from the start that this component would be part of a larger library. With that in mind, I focused on separation of concerns and reusability. I used Zustand for state management to keep things simple, though it can easily be replaced with a custom hook or another solution like React Query. Additionally, I assumed that our API doesn’t support filtering, which is why the filtering logic is handled client-side. Otherwise, the implementation would have involved query-based endpoints (e.g., /api/products?q=abc) and required a different handling strategy.

For styling, I opted to use custom SCSS instead of a utility framework like Tailwind CSS, in order to avoid adding an additional dependency. However, depending on the scale and complexity of the component and especially if Tailwind is already being used in the project, adopting it for consistency could be worth considering and is open for discussion.

## Usage

The MultiSelect component can be imported and used in your React application as follows:

```tsx
import { MultiSelect } from './multiSelect'; // Our library
import { useMultiSelectStore } from './multiSelect/store/useMultiSelectStore'; // Store, hook, etc.

function MyComponent() {
  const { 
    fetchOptions, 
    filteredOptions, 
    query, 
    toggleSelected, 
    selectedOptions, 
    setQuery 
  } = useMultiSelectStore();

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return (
    <div className="multi-select-container">
      <MultiSelect 
        options={filteredOptions} 
        selectedOptions={selectedOptions} 
        onChange={toggleSelected} 
        onSearch={setQuery} 
        query={query} 
      />
    </div>
  );
}
```

## Features

- **Multiple Selection**: Users can select and deselect multiple options
- **Search Functionality**: Built-in search to filter options as users type
- **Persistence**: Selected options are saved to localStorage and restored on page reload
- **Tested**: Comprehensive test coverage with Vitest and React Testing Library
- **Internationalization**: Support for multiple languages (English/Dutch)


## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bol-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```