import { useUser } from '../../hooks/useUser';
import { useItems } from '../../hooks/useItems';
import { useSearchAndSort } from '../../hooks/useSearchAndSort';
import { resolvePermission, isItemSelected } from '../../utils/itemsHelpers';
import ListToolbar from '../ListToolbar/ListToolbar';
import ItemListStatus from '../ItemListStatus/ItemListStatus';
import AddItemForm from '../AddItemForm/AddItemForm';
import ItemRow from '../ItemRow/ItemRow';
import './ItemList.css';

function ItemList({
  resource,
  title,
  params,
  pageSize,
  searchOptions = [],
  sortOptions = [],
  createNewItem,
  renderExtras,
  isItemSelected: checkSelection,
  canEdit = true,
  canDelete = true,
  newItemFields = { title: '' },
  noMoreMessage = 'אין עוד פריטים',
  titleField = 'title',
  itemTitleField = titleField,
  requiredField = 'title',
  defaultOpen = false,
  alwaysOpen = false,
  showId = true,
  layout = 'column',
}) {
  const { user } = useUser();
  const itemsParams = params || { userId: user.id };
  const { items, isLoading, error, hasMore, loadMore, addNewItem, updateExistingItem, removeItem } =
    useItems(resource, itemsParams, pageSize);
  const search = useSearchAndSort(items, searchOptions);

  const handleAdd = (newValues) => addNewItem(createNewItem(user.id, newValues));

  return (
    <section className="item-list">
      <div className="item-list__header">
        <h2 className="item-list__title">{title}</h2>
      </div>

      <ListToolbar searchOptions={searchOptions} sortOptions={sortOptions} search={search} />

      <AddItemForm onAdd={handleAdd} initialValues={newItemFields} requiredField={requiredField} />

      <ItemListStatus
        isLoading={isLoading}
        error={error}
        isEmpty={search.visibleItems.length === 0}
      />

      <div className={`item-list__items item-list__items--${layout}`}>
        {search.visibleItems.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            titleField={titleField}
            itemTitleField={itemTitleField}
            defaultOpen={defaultOpen}
            alwaysOpen={alwaysOpen}
            showId={showId}
            isSelected={checkSelection ? isItemSelected(checkSelection, item) : true}
            canEdit={resolvePermission(canEdit, item)}
            canDelete={resolvePermission(canDelete, item)}
            onUpdate={(changes) => updateExistingItem(item.id, changes)}
            onDelete={() => removeItem(item.id)}
          >
            {renderExtras && renderExtras(item, updateExistingItem)}
          </ItemRow>
        ))}
      </div>

      {pageSize && (
        <div className="item-list__footer">
          {hasMore && !isLoading && (
            <button className="btn btn-secondary" onClick={loadMore}>טען עוד</button>
          )}
          {!hasMore && !isLoading && items.length > 0 && (
            <p className="muted-message">{noMoreMessage}</p>
          )}
        </div>
      )}
    </section>
  );
}

export default ItemList;
