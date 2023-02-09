import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import Layout from "core/layout";

import storage from "../../core/helpers/storage";

type PrivateRouteProps = {
  roles?: number[];
  children: React.ReactElement;
};

const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { hasRole } = useAuth();

  if (!storage.getToken()) return <Navigate to="/login" replace />;
  if (!hasRole(roles)) return <Navigate to="/not-found" replace />;
  return <Layout>{children}</Layout>;
};

export default PrivateRoute;
