import Navigation from "@pages/Navigation";
import Spinner from "@styles/spinner/Spinner";
import { StorageControl } from "@utils/localStorage";
import { useTodo } from "context/todoContext";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthGuardLayoutProps {
  children: React.ReactNode;
}

const AuthGuardLayout: React.FC<AuthGuardLayoutProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUserToken } = useTodo();

  const fetchUserProfile = useCallback(() => {
    const userProfileResponse = StorageControl.storageGetter("token");

    if (userProfileResponse === null) {
      navigate("/signin");
      return;
    }

    setUserProfile(userProfileResponse);
    setUserToken(userProfileResponse);
  }, [navigate, setUserToken]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (!userProfile) {
    navigate("/signin");
    return <></>;
  }

  if (userProfile === null) return <Spinner />;

  return <Navigation>{children}</Navigation>;
};

export default AuthGuardLayout;
