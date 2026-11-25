import { useState } from 'react';
import { useItems } from '../../hooks/useItems';
import { useUser } from '../../hooks/useUser';
import AddItemForm from '../AddItemForm/AddItemForm';
import './Comments.css';

const COMMENT_FIELDS = { title: '', body: '' };

function Comments({ postId }) {
  const { user } = useUser();
  const { items, isLoading, error, addNewItem, updateExistingItem, removeItem } =
    useItems('comments', { postId });

  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: '', body: '' });

  const handleAdd = (commentValues) => addNewItem({
    postId,
    userId: user.id,
    email: user.email,
    name: commentValues.title,
    body: commentValues.body,
  });

  const startEditing = (comment) => {
    setEditingId(comment.id);
    setDraft({ name: comment.name, body: comment.body });
  };

  const saveEditing = async (commentId) => {
    await updateExistingItem(commentId, draft);
    setEditingId(null);
  };

  return (
    <section className="comments">
      <h4 className="comments__title">תגובות</h4>

      {isLoading && <p className="muted-message">טוען תגובות...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="comments__list">
        {items.map((comment) => (
          <div key={comment.id} className="comments__item">
            {editingId === comment.id ? (
              <div className="comments__edit">
                <textarea
                  className="textarea"
                  value={draft.name}
                  onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                />
                <textarea
                  className="textarea"
                  value={draft.body}
                  onChange={(event) => setDraft({ ...draft, body: event.target.value })}
                />
                <div className="comments__actions">
                  <button className="btn btn-primary btn-sm" onClick={() => saveEditing(comment.id)}>שמירה</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>ביטול</button>
                </div>
              </div>
            ) : (
              <>
                <div className="comments__content">
                  <span className="comments__author">{comment.email}</span>
                  <span>{comment.name}: {comment.body}</span>
                </div>
                {comment.userId === user.id && (
                  <div className="comments__actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => startEditing(comment)}>עריכה</button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(comment.id)}>מחיקה</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {!isLoading && items.length === 0 && <p className="muted-message">אין תגובות עדיין</p>}

      <AddItemForm onAdd={handleAdd} initialValues={COMMENT_FIELDS} />
    </section>
  );
}

export default Comments;
