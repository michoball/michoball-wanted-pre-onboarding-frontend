import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  // const navigate = useNavigate();
  // const location = useLocation();

  return (
    <AppContainer>
      <header className="App-header">
        <h1>원티드 프리온보딩 프론트엔드 - 선발 과제</h1>
      </header>
      <Outlet />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 100vh;
  background-color: #282c34;
  color: white;

  .App-header {
    width: 100%;
    height: 20vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Home;
