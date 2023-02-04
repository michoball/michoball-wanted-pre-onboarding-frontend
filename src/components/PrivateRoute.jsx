import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StorageControl } from "@utils/localStorage";
import TodoContext from "context/todoContext";

const PrivateRoute = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const { setUserToken } = useContext(TodoContext);

  useEffect(() => {
    const userToken = StorageControl.storageGetter("token");
    const userEmail = StorageControl.storageGetter("email");
    if (!userToken || !userEmail) {
      setLoggedIn(false);
    } else {
      setUserToken(userToken);
    }
  }, [setUserToken]);

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
