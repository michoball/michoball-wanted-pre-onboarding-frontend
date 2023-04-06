import SignInForm from "@components/SignInForm";
import styled from "styled-components";

const SignIn = () => {
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
