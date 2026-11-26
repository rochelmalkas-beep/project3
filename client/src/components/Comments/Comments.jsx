import ItemList from '../ItemList/ItemList';
import { useUser } from '../../hooks/useUser';
import './Comments.css';

// התוכן קודם, והחתימה (האימייל) אחריו
const renderCommentExtras = (comment) => (
  <>
    <span className="comments__body">{comment.body}</span>
    <span className="comments__author" dir="ltr">{comment.email}</span>
  </>
);

// בטופס השדה נקרא "title"; ל-db נכתב כ-"name"
const createNewComment = (postId, email) => (userId, { title, body }) => ({
  postId,
  userId,
  email,
  name: title,
  body,
});

function Comments({ postId }) {
  const { user } = useUser();

  if (!user) return null;

  const isMine = (comment) => comment.userId === user.id;

  return (
    <section className="comments">
      <ItemList
        resource="comments"
        title="Comments"
        params={{ postId }}
        newItemFields={{ title: '', body: '' }}
        itemTitleField="name"
        alwaysOpen
        showId={false}
        createNewItem={createNewComment(postId, user.email)}
        renderExtras={renderCommentExtras}
        isOwner={isMine}
      />
    </section>
  );
}

export default Comments;
