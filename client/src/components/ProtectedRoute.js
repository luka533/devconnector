import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!isAuthenticated && !isLoading) {
    // storing the route the not logged in user wanted to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
