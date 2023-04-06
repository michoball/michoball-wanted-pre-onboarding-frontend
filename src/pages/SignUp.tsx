import SignUpForm from "@components/SignUpForm";
import styled from "styled-components";

const SignUp = () => {
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
