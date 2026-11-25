import ItemList from "../../components/ItemList/ItemList"
import { NavLink } from 'react-router-dom';
import './Albums.css';


function Albums() {
  const searchOptions = [
    { value: 'id', label: 'מזהה' },
    { value: 'title', label: 'כותרת' },
  ];
  const createNewAlbum = (userId, { title }) => (
    {
      userId,
      title,
    }
  )

  const renderExtrasAlbum = (album) => (
    <NavLink
      className="album-link"
      to={`${album.id}/photos`} state={{ albumTitle: album.title }}
    >
      {album.title}
    </NavLink>
  )
  return (
    <ItemList resource="albums"
      title="MY Albums"
      searchOptions={searchOptions}
      createNewItem={createNewAlbum}
      renderExtras={renderExtrasAlbum}
    />)
}

export default Albums;