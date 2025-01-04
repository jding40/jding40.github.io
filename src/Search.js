// https://evergreen.segment.com/components/search-input
import { SearchInput } from "evergreen-ui";

function Search({ query, onChange }) {
  return (
    <SearchInput
      placeholder="Enter search term, for example: cats"
      width="100%"
      autoFocus
      value={query}
      onChange={onChange}
    />
  );
}

export default Search;
