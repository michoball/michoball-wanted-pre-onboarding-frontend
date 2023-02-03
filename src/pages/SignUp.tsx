import SignUpForm from "@components/SignUpForm";
import AuthContext from "context/authContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <SignUpSection>
      <header>
        <h2>Sign - Up</h2>
      </header>
      <SignUpForm />
    </SignUpSection>
  );
};

const SignUpSection = styled.section`
  width: 60%;

  header {
    text-align: center;
    text-transform: uppercase;
    padding: 20px 0;
  }
`;

export default SignUp;
