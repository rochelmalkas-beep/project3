import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import Info from '../../components/Info/Info'

function UserLayout() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleLogoutClick = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <h2>שלום {user?.name}</h2>

      <nav>
        <button onClick={() => setIsInfoOpen(true)}>Info</button>
        <NavLink to="todos">Todos</NavLink>
        <NavLink to="posts">Posts</NavLink>
        <NavLink to="albums">Albums</NavLink>
        <button onClick={handleLogoutClick}>Logout</button>
      </nav>
      {isInfoOpen && <Info user={user} onClose={() => setIsInfoOpen(false)} />}


      <Outlet />
    </div>
  );
}

export default UserLayout;