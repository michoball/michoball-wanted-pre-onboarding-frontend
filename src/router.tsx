import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Todo from "@pages/Todo";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import TodoGuardLayout from "layout/TodoGuardLayout";
import LoginGuardLayout from "layout/LoginGuardLayout";

export interface RouterBase {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  withAuth?: boolean;
}

export const routerData: RouterBase[] = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/signin",
    label: "로그인",
    element: <SignIn />,
    withAuth: false,
  },
  {
    id: 2,
    path: "/signup",
    label: "회원가입",
    element: <SignUp />,
    withAuth: false,
  },
  {
    id: 3,
    path: "/todo",
    label: "Todo",
    element: <Todo />,
    withAuth: true,
  },
];

export const routers = createBrowserRouter(
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <TodoGuardLayout>{router.element}</TodoGuardLayout>,
      };
    }
    return {
      path: router.path,
      element: <LoginGuardLayout>{router.element}</LoginGuardLayout>,
    };
  })
);
