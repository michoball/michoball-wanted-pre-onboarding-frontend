import SignInForm from "@components/SignInForm";
import AuthContext from "context/authContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignIn = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <SignInSection>
      <header>
        <h2>Sign - In</h2>
      </header>
      <SignInForm />
    </SignInSection>
  );
};

const SignInSection = styled.section`
  width: 60%;

  header {
    text-align: center;
    text-transform: uppercase;
    padding: 20px 0;
  }
`;

export default SignIn;
