import Navigation from "@pages/Navigation";
import Spinner from "@styles/spinner/Spinner";
import { StorageControl } from "@utils/localStorage";
import { useTodo } from "context/todoContext";
import { useRouter } from "hooks/useRouter";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardLayoutProps {
  children: React.ReactNode;
}

const AuthGuardLayout: React.FC<AuthGuardLayoutProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const { routeTo } = useRouter();
  const { setUserToken } = useTodo();

  const fetchUserProfile = useCallback(() => {
    const userProfileResponse = StorageControl.storageGetter("token");

    if (userProfileResponse === null) {
      routeTo("/signin");
      return;
    }

    setUserProfile(userProfileResponse);
    setUserToken(userProfileResponse);
  }, [routeTo, setUserToken]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile, routeTo]);

  if (userProfile === null) return <Spinner />;

  return userProfile ? (
    <Navigation>{children}</Navigation>
  ) : (
    <Navigate to="/signin" />
  );
};

export default AuthGuardLayout;
