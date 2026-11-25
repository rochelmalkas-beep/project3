import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterDetails from './pages/auth/RegisterDetails';
import UserLayout from './pages/UserLayout/UserLayout';
import Todos from './pages/Todos/Todos';
import Posts from './pages/Posts/Posts';
import Albums from './pages/Albums/Albums';
import Photos from './pages/Photos/Photos';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {

  return (
   
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/details" element={<RegisterDetails />} />

      <Route
        path="/:username"
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="todos" element={<Todos />} />
        <Route path="posts" element={<Posts />} />
        <Route path="albums" element={<Albums />} />
        <Route path="albums/:albumId/photos" element={<Photos />} />
      </Route>
    </Routes>
    );
}

export default App