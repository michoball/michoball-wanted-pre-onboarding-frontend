import SignUpForm from "@components/SignUpForm";
import React from "react";
import styled from "styled-components";

const SignUp = () => {
  return (
    <SignUpSection>
      <header>
        <h2>Sign - In</h2>
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
