import { useState } from 'react';
import { useItems } from '../../hooks/useItems';
import { useUser } from '../../hooks/useUser';
import AddItemForm from '../AddItemForm/AddItemForm';

const COMMENT_FIELDS = { title: '', body: '' };

function Comments({ postId }) {
  const { user } = useUser();
  const { items: comments, isLoading, error, addNewItem, updateExistingItem, removeItem } =
    useItems('comments', { postId });
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ title: '', body: '' });

  const startEditing = (comment) => {
    setEditingId(comment.id);
    setDraft({ title: comment.name, body: comment.body });
  };

  const saveEditing = async () => {
    const trimmedTitle = draft.title.trim();
    const trimmedBody = draft.body.trim();
    if (trimmedTitle && trimmedBody) {
      await updateExistingItem(editingId, { name: trimmedTitle, body: trimmedBody });
    }
    setEditingId(null);
  };

  return (
    <div>
      <AddItemForm
        initialValues={COMMENT_FIELDS}
        onAdd={(commentValues) =>
          addNewItem({
            postId,
            userId: user.id,
            email: user.email,
            name: commentValues.title,
            body: commentValues.body,
          })
        }
      />

      {isLoading && <p>טוען...</p>}
      {error && <p>{error}</p>}
      {!isLoading && comments.length === 0 && <p>אין תגובות</p>}

      <ul>
        {comments.map((comment) => {
          const isMine = comment.userId === user.id;
          return (
            <li key={comment.id}>
              <strong>{comment.email}</strong> — {comment.name}: {comment.body}
              {isMine && editingId !== comment.id && (
                <button onClick={() => startEditing(comment)}>עריכה</button>
              )}
              {isMine && <button onClick={() => removeItem(comment.id)}>מחיקה</button>}
              {editingId === comment.id && (
                <>
                  <input
                    value={draft.title}
                    onChange={(event) => setDraft((previous) => ({ ...previous, title: event.target.value }))}
                    placeholder="כותרת התגובה"
                  />
                  <textarea
                    value={draft.body}
                    onChange={(event) => setDraft((previous) => ({ ...previous, body: event.target.value }))}
                  />
                  <button onClick={saveEditing}>שמירה</button>
                  <button onClick={() => setEditingId(null)}>ביטול</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Comments;
