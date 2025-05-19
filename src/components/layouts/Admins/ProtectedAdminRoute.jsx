// src/components/auth/ProtectedAdminRoute.jsx
import { useAdmin } from '../../../context/AdminContext';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated } = useAdmin();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default ProtectedAdminRoute;