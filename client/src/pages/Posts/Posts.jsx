import { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import ItemList from '../../components/ItemList/ItemList';
import PostExtras from '../../components/PostExtras/PostExtras';
import './Posts.css';

const searchOptions = [
  { value: 'id', label: 'מזהה' },
  { value: 'title', label: 'כותרת' },
];

const newItemFields = { title: '', body: '' };

const createNewPost = (userId, { title, body }) => ({ userId, title, body });

function Posts() {
  const { user } = useUser();
  const [showAll, setShowAll] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const isMine = (post) => post.userId === user.id;

  const togglePost = (postId) =>
    setSelectedPostId((previous) => (previous === postId ? null : postId));

  const toggleShowAll = () => {
    setShowAll((previous) => !previous);
    setSelectedPostId(null);
  };

  const renderExtrasPost = (post) => (
    <PostExtras
      post={post}
      isSelected={selectedPostId === post.id}
      onToggle={() => togglePost(post.id)}
    />
  );

  return (
    <div className="posts-page">
      <div className="posts-page__header">
        <button className="btn btn-secondary btn-sm" onClick={toggleShowAll}>
          {showAll ? 'הפוסטים שלי' : 'כל הפוסטים'}
        </button>
      </div>

      <ItemList
        resource="posts"
        title={showAll ? 'כל הפוסטים' : 'הפוסטים שלי'}
        params={showAll ? {} : undefined}
        searchOptions={searchOptions}
        createNewItem={createNewPost}
        newItemFields={newItemFields}
        canEdit={isMine}
        canDelete={isMine}
        isItemSelected={(post) => post.id === selectedPostId}
        renderExtras={renderExtrasPost}
      />
    </div>
  );
}

export default Posts;
