import React, { useState, useEffect } from "react";
import { StorageControl } from "@utils/localStorage";
import AuthService from "@api/authService";

interface AuthContextType {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: (email: string, password: string) => Promise<string>;
  onSignUp: (email: string, password: string) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: async (email: string, password: string) => "",
  onSignUp: (email: string, password: string) => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = StorageControl.storageGetter("token");
    const userEmail = StorageControl.storageGetter("email");
    if (userToken && userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (email: string, password: string) => {
    try {
      const { data } = await AuthService.logInService(email, password);
      StorageControl.storageSetter(email, data.access_token);
      setIsLoggedIn(true);
      return "success";
    } catch (error) {
      console.log(error);
      alert(error);
      return "failed";
    }
  };

  const signUpHandler = async (email: string, password: string) => {
    try {
      const res = await AuthService.signUpService(email, password);
      if (res.status === 201) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    StorageControl.storageRemover();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignUp: signUpHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
