import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
function ProtectedRoute({ children }) {
  const { user } = useUser();
  const { username } = useParams();

  if (!user || user.username !== username) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;