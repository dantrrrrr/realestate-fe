import { Navigate, Outlet } from "react-router-dom";
import { useUserSelector } from "../redux/user/userSlice";
export default function PrivateRoute({ children }) {
  const { currentUser: isAuthenticated } = useUserSelector();

  // return !currentUser ? (
  //   <Navigate to="/sign-in" />
  // ) : children ? (
  //   children
  // ) : (
  //   <Outlet />
  // );
  return isAuthenticated ? children || <Outlet /> : <Navigate to="/sign-in" />;
}
