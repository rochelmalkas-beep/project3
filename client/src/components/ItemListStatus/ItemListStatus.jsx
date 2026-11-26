import './ItemListStatus.css';

function ItemListStatus({ isLoading, error, isEmpty }) {
  if (isLoading) {
    return <p className="item-list-status">Loading...</p>;
  }

  if (error) {
    return <p className="item-list-status item-list-status--error">{error}</p>;
  }

  if (isEmpty) {
    return <p className="item-list-status">No items found</p>;
  }

  return null;
}

export default ItemListStatus;
