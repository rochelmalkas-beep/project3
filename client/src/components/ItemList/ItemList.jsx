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
  collapsible = false,
  canEdit = true,
  canDelete = true,
  newItemFields = { title: '' },
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

  const handleAdd = (newValues) => addNewItem(createNewItem(user.id, newValues));

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

      <AddItemForm onAdd={handleAdd} initialValues={newItemFields} />

      {isLoading && <p>טוען...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && visibleItems.length === 0 && <p>לא נמצאו פריטים</p>}

      {visibleItems.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          collapsible={collapsible}
          canEdit={typeof canEdit === 'function' ? canEdit(item) : canEdit}
          canDelete={typeof canDelete === 'function' ? canDelete(item) : canDelete}
          onUpdate={(changes) => updateExistingItem(item.id, changes)}
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