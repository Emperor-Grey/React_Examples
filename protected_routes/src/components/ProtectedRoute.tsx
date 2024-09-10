import { PropsWithChildren } from 'react';
import { User } from '../api/auth';
import { useAuth } from './useAuth';

type ProtectedRouteProps = PropsWithChildren<{
  allowedRoles?: User['role'][];
}>;

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  if (
    currentUser === null ||
    (allowedRoles && !allowedRoles.includes(currentUser.role))
  ) {
    return <div>Permission Denied to view this content</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
