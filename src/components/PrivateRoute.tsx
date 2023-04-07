import React from "react";
import { Navigate } from "react-router-dom";
import Navigation from "@pages/Navigation";
import { useRouter } from "hooks/useRouter";
import { StorageControl } from "@utils/localStorage";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const userToken = StorageControl.storageGetter("token");
  const { currentPath } = useRouter();

  if (currentPath === "/") {
    return <Navigation>{children}</Navigation>;
  }

  return !userToken ? (
    <Navigation>{children}</Navigation>
  ) : (
    <Navigate to="/todo" />
  );
};

export default PrivateRoute;
