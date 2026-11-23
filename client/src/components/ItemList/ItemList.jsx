import { useUser } from '../../hooks/useUser';
import { useItems } from '../../hooks/useItems';
import { useSearchAndSort } from '../../hooks/useSearchAndSort';
import SearchBar from '../SearchBar/SearchBar';
import SelectField from '../SelectField/SelectField';
import AddItemForm from '../AddItemForm/AddItemForm';
import ItemRow from '../ItemRow/ItemRow';

function ItemList({
  resource,
  title,
  params,
  pageSize,
  searchOptions = [],
  sortOptions = [],
  createNewItem,
  renderExtras,
  noMoreMessage = 'אין עוד פריטים',
}) {
  const { user } = useUser();
  const itemsParams = params || { userId: user.id };
  const { items, isLoading, error, hasMore, loadMore, addNewItem, updateExistingItem, removeItem } =
    useItems(resource, itemsParams, pageSize);
  const {
    searchField, searchText, sortField,
    setSearchText, setSortField, changeSearchField, visibleItems,
  } = useSearchAndSort(items, searchOptions);

  const handleAdd = (newTitle) => addNewItem(createNewItem(user.id, newTitle));

  return (
    <div>
      <h2>{title}</h2>

      {searchOptions.length > 0 && (
        <SearchBar
          searchOptions={searchOptions}
          searchField={searchField}
          searchText={searchText}
          onFieldChange={changeSearchField}
          onTextChange={setSearchText}
        />
      )}

      {sortOptions.length > 0 && (
        <SelectField value={sortField} onChange={setSortField} options={sortOptions} emptyLabel="ללא מיון" />
      )}

      <AddItemForm onAdd={handleAdd} />

      {isLoading && <p>טוען...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && visibleItems.length === 0 && <p>לא נמצאו פריטים</p>}

      {visibleItems.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          onUpdateTitle={(newTitle) => updateExistingItem(item.id, { title: newTitle })}
          onDelete={() => removeItem(item.id)}
        >
          {renderExtras && renderExtras(item, updateExistingItem)}
        </ItemRow>
      ))}

      {pageSize && hasMore && !isLoading && <button onClick={loadMore}>טען עוד</button>}
      {pageSize && !hasMore && !isLoading && items.length > 0 && <p>{noMoreMessage}</p>}
    </div>
  );
}

export default ItemList;