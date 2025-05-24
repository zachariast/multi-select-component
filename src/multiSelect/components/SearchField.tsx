import type { FC } from "react";
import searchSVG from "../../assets/search.svg";
import { nl } from "../locales";

interface Props {
  query: string;
  onSearch: (query: string) => void;
}

export const SearchField: FC<Props> = ({ query, onSearch }) => {
  return (
    <div className="search-field">
      <input
        aria-label="Search options"
        type="text"
        placeholder={nl.search_placeholder}
        value={query}
        onChange={(e) => onSearch(e.target.value)}
      />
      <img src={searchSVG} alt={nl.search_icon_alt} className="search-field__icon" />
    </div>
  );
}