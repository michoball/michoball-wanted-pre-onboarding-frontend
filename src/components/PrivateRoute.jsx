import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StorageControl } from "@utils/localStorage";
import TodoContext from "context/todoContext";
import AuthContext from "context/authContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { setUserToken } = useContext(TodoContext);

  useEffect(() => {
    if (isLoggedIn) {
      const userToken = StorageControl.storageGetter("token");
      if (!userToken) return;
      setUserToken(userToken);
    }
  }, [setUserToken, isLoggedIn]);

  return isLoggedIn ? <Outlet /> : <Navigate to="/todo" />;
};

export default PrivateRoute;
