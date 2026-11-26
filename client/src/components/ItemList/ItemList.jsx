import { useUser } from '../../hooks/useUser';
import { useItems } from '../../hooks/useItems';
import { useSearchAndSort } from '../../hooks/useSearchAndSort';
import { resolvePermission } from '../../utils/itemsHelpers';
import ListToolbar from '../ListToolbar/ListToolbar';
import ItemListStatus from '../ItemListStatus/ItemListStatus';
import AddItemForm from '../AddItemForm/AddItemForm';
import ItemRow from '../ItemRow/ItemRow';
import ItemListPagination from '../ItemListPagination/ItemListPagination';
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
  isOwner = true,
  newItemFields = { title: '' },
  noMoreMessage = 'No more items',
  titleField = 'title',
  itemTitleField = titleField,
  requiredField = 'title',
  alwaysOpen = false,
  selectButton = false,
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
            alwaysOpen={alwaysOpen}
            selectButton={selectButton}
            showId={showId}
            isOwner={resolvePermission(isOwner, item)}
            onUpdate={(changes) => updateExistingItem(item.id, changes)}
            onDelete={() => removeItem(item.id)}
          >
            {renderExtras && renderExtras(item, updateExistingItem)}
          </ItemRow>
        ))}
      </div>

      {pageSize && (
        <ItemListPagination
          hasMore={hasMore}
          isLoading={isLoading}
          itemsCount={items.length}
          loadMore={loadMore}
          noMoreMessage={noMoreMessage}
        />
      )}
    </section>
  );
}

export default ItemList;
