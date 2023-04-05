import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "context/authContext";
import { TodoProvider } from "context/todoContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
