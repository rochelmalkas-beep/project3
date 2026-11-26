import { useUser } from '../../hooks/useUser';
import './Info.css';

function Info({ onClose }) {
  const { user } = useUser();

  return (
    <div className="info-overlay">
      <div className="info-window">
        <h3>Personal Info</h3>

        <p>Full name: {user?.name}</p>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phone}</p>
        <p>Website: {user?.website || '-'}</p>

        <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Info;
