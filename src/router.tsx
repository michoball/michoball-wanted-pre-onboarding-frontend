import Home from "@pages/Home";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Todo from "@pages/Todo";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthGuardLayout from "layout/AuthGuardLayout";
import Navigation from "@pages/Navigation";

interface RouterBase {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
  withAuth?: boolean;
}

const routerData: RouterBase[] = [
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
        element: <AuthGuardLayout>{router.element}</AuthGuardLayout>,
      };
    } else {
      return {
        path: router.path,
        element: <Navigation>{router.element}</Navigation>,
      };
    }
  })
);
