import { useState } from 'react';
import Comments from '../Comments/Comments';
import './PostExtras.css';

function PostExtras({ post, isSelected, onToggle }) {
  const [showComments, setShowComments] = useState(false);

  const handleToggle = () => {
    setShowComments(false);
    onToggle();
  };

  return (
    <div className="post-extras">
      <div className="item-row__actions">
        <button
          className={`btn btn-sm ${isSelected ? 'btn-secondary' : 'btn-primary'}`}
          onClick={handleToggle}
        >
          {isSelected ? 'סגור' : 'בחר'}
        </button>
      </div>

      {isSelected && (
        <>
          <p className="post-extras__body">{post.body}</p>
          <div className="item-row__actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowComments((previous) => !previous)}
            >
              {showComments ? 'הסתר תגובות' : 'הצג תגובות'}
            </button>
          </div>
          {showComments && <Comments postId={post.id} />}
        </>
      )}
    </div>
  );
}

export default PostExtras;
