import Navigation from "@pages/Navigation";
import Spinner from "@styles/spinner/Spinner";
import { StorageControl } from "@utils/localStorage";
import TodoContext from "context/todoContext";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUserToken } = useContext(TodoContext);

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

  if (userProfile?.length === 0) {
    navigate("/signin");
    return <></>;
  }

  if (userProfile === null) return <Spinner />;

  return <Navigation>{children}</Navigation>;
};

export default GeneralLayout;
