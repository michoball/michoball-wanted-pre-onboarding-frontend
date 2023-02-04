import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <>
      <NavigationContainer>
        <div className="nav-header">
          <h1>원티드 프리온보딩 프론트엔드 - 선발 과제</h1>
        </div>
        <NavigationLink>
          <Link to="/">Home 으로</Link>
          {pathname !== "/todo" && <Link to="/todo">Todo 바로가기</Link>}
          {pathname !== "/signin" && <Link to="/signin">Login 바로가기</Link>}
          {pathname !== "/signup" && (
            <Link to="/signup">회원가입 바로가기</Link>
          )}
        </NavigationLink>
      </NavigationContainer>
      <Outlet />
    </>
  );
};

const NavigationContainer = styled.div`
  width: 100%;
  height: 30vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 30px;
  }
`;

const NavigationLink = styled.nav`
  display: flex;
  font-weight: bold;
  gap: 20px;

  a {
    padding: 10px 15px;
    text-decoration: none;
    color: white;
    border: 1px solid white;
    border-radius: 10px;
  }
`;

export default Navigation;
