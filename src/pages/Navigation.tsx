import { useRouter } from "@hooks/useRouter";
import React from "react";
import { Link } from "react-router-dom";
import { RouterBase } from "router";
import styled from "styled-components";

interface NavigationProps {
  children: React.ReactNode;
  sidebarContent: RouterBase[];
}

const Navigation: React.FC<NavigationProps> = ({
  children,
  sidebarContent,
}) => {
  const { currentPath } = useRouter();

  return (
    <>
      <NavigationContainer>
        <div className="nav-header">
          <h1>원티드 프리온보딩 프론트엔드 - 선발 과제</h1>
        </div>
        <NavigationLink>
          {sidebarContent.map(({ label, path, id }) => {
            if (path === "/") {
              return (
                <Link to={path} key={id}>
                  {label} 으로
                </Link>
              );
            }
            return (
              currentPath !== path && (
                <Link to={path} key={id}>
                  {label} 바로가기
                </Link>
              )
            );
          })}
        </NavigationLink>
      </NavigationContainer>
      {children}
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
