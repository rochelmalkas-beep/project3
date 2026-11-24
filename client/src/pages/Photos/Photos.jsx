import ItemList from "../../components/ItemList/ItemList"
import { useParams } from 'react-router-dom';
function Photos() {
  const { albumId } = useParams();
  const createNewPhoto = (userId, { title, url }) => ({
    title,
    albumId: Number(albumId),
    url,
    thumbnailUrl: url,

  }
  )

  const rederExtrasPhotos = (photo) => (
    <img src={photo.thumbnailUrl} alt={photo.title} width={150} />
  )

  return (<>
    <ItemList
      resource="photos"
      title={albumId}
      params={{ albumId }}
      pageSize={10}
      renderExtras={rederExtrasPhotos}
      createNewItem={createNewPhoto}
      newItemFields={{ title: '', url: '' }}
      noMoreMessage='אין עוד תמונות להצגה'
    />

  </>)
}

export default Photos;