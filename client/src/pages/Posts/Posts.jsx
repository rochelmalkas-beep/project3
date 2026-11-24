import { useState } from 'react';
import ItemList from '../../components/ItemList/ItemList';
import Comments from '../../components/Comments/Comments';
import { useUser } from '../../hooks/useUser';

function Posts() {
  const { user } = useUser();
  const [showAll, setShowAll] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentsPostId, setCommentsPostId] = useState(null);

  const searchOptions = [
    { value: 'id', label: 'מזהה' },
    { value: 'title', label: 'כותרת' },
  ];

  const newItemFields = { title: '', body: '' };

  const createNewPost = (userId, { body, title }) => ({
    userId,
    title,
    body,
  });

  const isMine = (post) => post.userId === user.id;

  const renderExtrasPost = (post) => (
    <div>
      <button
        onClick={() => setSelectedPostId((previous) => (previous === post.id ? null : post.id))}
      >
        {selectedPostId === post.id ? 'סגור' : 'בחר'}
      </button>
      {selectedPostId === post.id && (
        <>
          <p>{post.body}</p>
          <button
            onClick={() =>
              setCommentsPostId((previous) => (previous === post.id ? null : post.id))
            }
          >
            {commentsPostId === post.id ? 'הסתר תגובות' : 'הצג תגובות'}
          </button>
          {commentsPostId === post.id && <Comments postId={post.id} />}
        </>
      )}
    </div>
  );

  return (
    <>
      <button
        onClick={() => {
          setShowAll((previous) => !previous);
          setSelectedPostId(null);
          setCommentsPostId(null);
        }}
      >
        {showAll ? 'הפוסטים שלי' : 'כל הפוסטים'}
      </button>

      <ItemList
        resource="posts"
        title={showAll ? 'כל הפוסטים' : 'הפוסטים שלי'}
        params={showAll ? {} : undefined}
        searchOptions={searchOptions}
        createNewItem={createNewPost}
        newItemFields={newItemFields}
        canEdit={isMine}
        canDelete={isMine}
        renderExtras={renderExtrasPost}
      />
    </>
  );
}

export default Posts;
