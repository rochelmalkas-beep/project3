import { useUser } from '../../hooks/useUser';
import './Info.css';

function Info({ onClose }) {
  const { user } = useUser();

  return (
    <div className="info-overlay">
      <div className="info-window">
        <h3>פרטים אישיים</h3>

        <p>שם מלא: {user?.name}</p>
        <p>שם משתמש: {user?.username}</p>
        <p>אימייל: {user?.email}</p>
        <p>טלפון: {user?.phone}</p>
        <p>אתר: {user?.website || '-'}</p>

        <button className="btn btn-secondary btn-sm" onClick={onClose}>סגירה</button>
      </div>
    </div>
  );
}

export default Info;
