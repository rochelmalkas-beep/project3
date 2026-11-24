import ItemList from "../../components/ItemList/ItemList"
import {  NavLink } from 'react-router-dom';

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

const renderExtrasAlbum=(album)=>(
 
    
      <NavLink to={`${album.id}/photos`}>Albums</NavLink>
  
)
  return (
    <ItemList resource="albums"
      title="MY Albums"
      searchOptions={searchOptions}
      createNewItem={createNewAlbum}
      renderExtras={renderExtrasAlbum}
      collapsible
    />)
}

export default Albums;