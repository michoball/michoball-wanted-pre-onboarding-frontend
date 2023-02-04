import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Todo from "@pages/Todo";
import PrivateRoute from "@components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<PrivateRoute />}>
          <Route path="/todo" element={<Todo />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
