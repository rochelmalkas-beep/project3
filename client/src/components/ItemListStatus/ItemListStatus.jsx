import './ItemListStatus.css';

function ItemListStatus({ isLoading, error, isEmpty }) {
  if (isLoading) {
    return <p className="item-list-status">טוען...</p>;
  }

  if (error) {
    return <p className="item-list-status item-list-status--error">{error}</p>;
  }

  if (isEmpty) {
    return <p className="item-list-status">לא נמצאו פריטים</p>;
  }

  return null;
}

export default ItemListStatus;
