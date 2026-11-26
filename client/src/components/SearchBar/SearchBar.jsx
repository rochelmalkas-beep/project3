import SelectField from '../SelectField/SelectField';
import './SearchBar.css';

function SearchBar({ searchOptions, searchField, searchText, onFieldChange, onTextChange }) {
  const selectedOption = searchOptions.find((option) => option.value === searchField);

  return (
    <div className="search-bar">
      <SelectField
        className="search-bar__select"
        value={searchField}
        onChange={onFieldChange}
        options={searchOptions}
      />

      {selectedOption?.choices ? (
        <SelectField
          className="search-bar__select"
          value={searchText}
          onChange={onTextChange}
          options={selectedOption.choices}
          emptyLabel="All"
        />
      ) : (
        <input
          className="input search-bar__input"
          value={searchText}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder="Search..."
        />
      )}
    </div>
  );
}

export default SearchBar;
