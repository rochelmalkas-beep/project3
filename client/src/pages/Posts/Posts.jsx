import { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import ItemList from '../../components/ItemList/ItemList';
import PostExtras from '../../components/PostExtras/PostExtras';
import './Posts.css';

const SEARCH_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Title' },
];

const NEW_ITEM_FIELDS = { title: '', body: '' };

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
          {showAll ? 'My posts' : 'All posts'}
        </button>
      </div>

      <ItemList
        resource="posts"
        title={showAll ? 'All Posts' : 'My Posts'}
        params={showAll ? {} : undefined}
        searchOptions={SEARCH_OPTIONS}
        createNewItem={createNewPost}
        newItemFields={NEW_ITEM_FIELDS}
        isOwner={isMine}
        renderExtras={renderExtrasPost}
      />
    </div>
  );
}

export default Posts;
