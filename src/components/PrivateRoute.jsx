import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StorageControl } from "@utils/localStorage";
import TodoContext from "context/todoContext";

const PrivateRoute = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const { setUserToken } = useContext(TodoContext);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const userToken = StorageControl.storageGetter("token");
      if (!userToken) {
        setLoggedIn(false);
        return;
      }
      setUserToken(userToken);
    }

    return () => {
      isMounted = false;
    };
  }, [setUserToken]);

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
