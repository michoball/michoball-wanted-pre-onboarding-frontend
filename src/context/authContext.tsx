import React, { useState, useEffect } from "react";
import { StorageControl } from "@utils/localStorage";
import AuthService from "@api/authService";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  onLogout: () => void;
  onLogin: (email: string, password: string) => void;
  onSignUp: (email: string, password: string) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {},
  onSignUp: (email: string, password: string) => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = StorageControl.storageGetter("token");
    const userEmail = StorageControl.storageGetter("email");
    if (userToken && userEmail) {
      setCurrentUser({ email: userEmail, token: userToken });
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (email: string, password: string) => {
    try {
      const { data } = await AuthService.logInService(email, password);
      setCurrentUser({ email, token: data.access_token });
      StorageControl.storageSetter(email, data.access_token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      alert(error);
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
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: currentUser,
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
