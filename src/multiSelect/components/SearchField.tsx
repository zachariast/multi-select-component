import type { FC } from "react";

interface Props {
  query: string;
  onSearch: (query: string) => void;
}

export const SearchField: FC<Props> = ({ query, onSearch }) => {
  return (
    <div>
      <input
        aria-label="Search options"
        type="text"
        placeholder={'Type to search...'}
        value={query}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}