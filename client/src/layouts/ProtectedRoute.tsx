import { Outlet } from "react-router-dom";
import useCheckIsLogin from "../features/auth/hooks/useCheckIsLogin";

const ProtectedRoute = () => {
  useCheckIsLogin();
  return (
      <Outlet />
  );
};

export default ProtectedRoute;
