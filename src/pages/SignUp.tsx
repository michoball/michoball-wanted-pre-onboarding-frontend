import SignUpForm from "@components/SignUpForm";
import { useAuth } from "context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate("/todo");
  }, [isLoggedIn, navigate]);

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
