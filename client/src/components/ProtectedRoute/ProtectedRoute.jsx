import { useUser } from "../../hooks/useUser";
import { Navigate,useParams } from 'react-router-dom';
function ProtectedRoute({ children }) {
  const { user } = useUser();
  const { username } = useParams();

  if (!user || user.username !== username) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;