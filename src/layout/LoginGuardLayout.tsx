import React from "react";
import { Navigate } from "react-router-dom";
import { useRouter } from "hooks/useRouter";
import { StorageControl } from "@utils/localStorage";
import Navigation from "@pages/Navigation";

interface LoginGuardLayoutProps {
  children: React.ReactNode;
}

const LoginGuardLayout: React.FC<LoginGuardLayoutProps> = ({ children }) => {
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

export default LoginGuardLayout;
