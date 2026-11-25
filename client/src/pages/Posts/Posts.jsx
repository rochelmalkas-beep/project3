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

  const isMine = (post) => post.userId === user.id;

  const toggleShowAll = () => setShowAll((previous) => !previous);

  const renderExtrasPost = (post) => <PostExtras post={post} />;

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
        renderExtras={renderExtrasPost}
      />
    </div>
  );
}

export default Posts;
