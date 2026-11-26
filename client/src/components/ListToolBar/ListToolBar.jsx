import SearchBar from '../SearchBar/SearchBar';
import SelectField from '../SelectField/SelectField';
import './ListToolBar.css';

function ListToolbar({ searchOptions, sortOptions, search }) {
  if (searchOptions.length === 0 && sortOptions.length === 0) {
    return null;
  }

  return (
    <div className="list-toolbar">
      {searchOptions.length > 0 && (
        <SearchBar
          searchOptions={searchOptions}
          searchField={search.searchField}
          searchText={search.searchText}
          onFieldChange={search.changeSearchField}
          onTextChange={search.setSearchText}
        />
      )}

      {sortOptions.length > 0 && (
        <SelectField
          className="list-toolbar__select"
          value={search.sortField}
          onChange={search.setSortField}
          options={sortOptions}
          emptyLabel="No sort"
        />
      )}
    </div>
  );
}

export default ListToolbar;
