import SignInForm from "@components/SignInForm";
import { useAuth } from "context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignIn = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate("/todo");
  }, [isLoggedIn, navigate]);

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
