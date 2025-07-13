import { useAuth } from '@/hooks/useAuth';

import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirige a la página de login y guarda la ubicación actual
    return <Navigate to='/auth' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
