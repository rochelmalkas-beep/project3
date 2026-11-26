import ItemList from "../../components/ItemList/ItemList"
import { NavLink } from 'react-router-dom';
import './Albums.css';


const SEARCH_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Title' },
];

const createNewAlbum = (userId, { title }) => ({
  userId,
  title,
});

const renderExtrasAlbum = (album) => (
  <NavLink
    className="album-link"
    to={`${album.id}/photos`} state={{ albumTitle: album.title }}
  >
    View photos
  </NavLink>
);

function Albums() {
  return (
    <ItemList resource="albums"
      title="My Albums"
      searchOptions={SEARCH_OPTIONS}
      createNewItem={createNewAlbum}
      renderExtras={renderExtrasAlbum}
    />)
}

export default Albums;