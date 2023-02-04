import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { StorageControl } from "@utils/localStorage";

const PrivateRoute = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const userToken = StorageControl.storageGetter("token");
    const userEmail = StorageControl.storageGetter("email");
    if (!userToken || !userEmail) {
      setLoggedIn(false);
    }
  }, []);

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
