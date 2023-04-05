import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Todo from "@pages/Todo";
import Navigation from "@pages/Navigation";
import PrivateRoute from "@components/PrivateRoute";
import styled from "styled-components";

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<PrivateRoute />}>
            <Route path="/todo" element={<Todo />} />
          </Route>
        </Route>
      </Routes>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  background-color: #282c34;
  color: white;
`;

export default App;
