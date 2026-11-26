import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import Info from '../../components/Info/Info';
import './UserLayout.css';

function UserLayout() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleLogoutClick = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="user-layout">
      <header className="user-layout__header">
        <h2 className="user-layout__greeting">Hello {user?.name}</h2>
        <nav className="user-layout__nav" dir="ltr">
          <NavLink className="user-layout__link" to="." end>Dashboard</NavLink>
          <NavLink className="user-layout__link" to="todos">Todos</NavLink>
          <NavLink className="user-layout__link" to="posts">Posts</NavLink>
          <NavLink className="user-layout__link" to="albums">Albums</NavLink>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsInfoOpen(true)}>
            Info
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleLogoutClick}>
            Logout
          </button>
        </nav>
      </header>

      <main className="user-layout__main">
        <Outlet />
      </main>

      {isInfoOpen && <Info onClose={() => setIsInfoOpen(false)} />}
    </div>
  );
}

export default UserLayout;
