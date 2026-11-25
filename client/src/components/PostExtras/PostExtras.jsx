import { useState } from 'react';
import Comments from '../Comments/Comments';
import './PostExtras.css';

// הנפתח/נסגר מתבצע בלחיצה על שורת הפריט (ה-head של ItemRow)
function PostExtras({ post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="post-extras">
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
    </div>
  );
}

export default PostExtras;
