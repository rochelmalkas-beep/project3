import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div>
      <div>UserLayout</div>
      <Outlet />
    </div>
  );
}

export default UserLayout;