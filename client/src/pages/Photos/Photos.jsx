import ItemList from "../../components/ItemList/ItemList"
import { useLocation, useParams } from 'react-router-dom'
import './Photos.css'

function Photos() {
  const { albumId } = useParams()
  const { state } = useLocation()

  const createNewPhoto = (userId, { title, url }) => ({
    title,
    albumId: Number(albumId),
    url,
    thumbnailUrl: url,
  }
  )
  const albumTitle = state?.albumTitle || albumId;
  const renderPhotoExtras = (photo) => (
    <img className="photo-thumb" src={photo.thumbnailUrl} alt={photo.title} />
  )

  return (<>
    <ItemList
      resource="photos"
      title={albumTitle}
      params={{ albumId }}
      pageSize={12}
      alwaysOpen
      showId={false}
      layout="row"
      renderExtras={renderPhotoExtras}
      createNewItem={createNewPhoto}
      newItemFields={{ title: '', url: '' }}
      noMoreMessage='No more photos'
    />

  </>)
}

export default Photos;