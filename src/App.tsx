import { RouterProvider } from "react-router-dom";
import styled from "styled-components";
import { routers } from "router";

function App() {
  return (
    <AppContainer>
      <RouterProvider router={routers} />
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
