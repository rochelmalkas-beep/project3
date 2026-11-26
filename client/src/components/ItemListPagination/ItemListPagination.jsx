import './ItemListPagination.css';

// כפתור "טען עוד" והודעת "אין עוד פריטים" — מוצג רק כשיש pageSize
function ItemListPagination({ hasMore, isLoading, itemsCount, loadMore, noMoreMessage }) {
  if (isLoading) return null;

  return (
    <div className="item-list__footer">
      {hasMore ? (
        <button className="btn btn-secondary" onClick={loadMore}>Load more</button>
      ) : (
        itemsCount > 0 && <p className="muted-message">{noMoreMessage}</p>
      )}
    </div>
  );
}

export default ItemListPagination;
