import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "context/authContext";
import Navigation from "@pages/Navigation";
import { useRouter } from "hooks/useRouter";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { currentPath } = useRouter();

  if (currentPath === "/") {
    return <Navigation>{children}</Navigation>;
  }

  return !isLoggedIn ? (
    <Navigation>{children}</Navigation>
  ) : (
    <Navigate to="/todo" />
  );
};

export default PrivateRoute;
