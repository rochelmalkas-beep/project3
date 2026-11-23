import SelectField from '../SelectField/SelectField';

function SearchBar({ searchOptions, searchField, searchText, onFieldChange, onTextChange }) {
  const selectedOption = searchOptions.find((option) => option.value === searchField);

  return (
    <div>
      <SelectField value={searchField} onChange={onFieldChange} options={searchOptions} />

      {selectedOption?.choices ? (
        <SelectField
          value={searchText}
          onChange={onTextChange}
          options={selectedOption.choices}
          emptyLabel="הכל"
        />
      ) : (
        <input
          value={searchText}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder="חיפוש..."
        />
      )}
    </div>
  );
}

export default SearchBar;