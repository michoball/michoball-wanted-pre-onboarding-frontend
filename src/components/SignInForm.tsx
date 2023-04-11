import { ChangeEvent, useState } from "react";
import AppButton from "@styles/button/AppButton";
import FormInput from "@styles/FormInput";
import styled from "styled-components";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  emailExpression,
  emailRegex,
  passwordExpression,
  passwordRegex,
} from "@utils/regex";

export interface State {
  value: string;
  isValid: boolean | null;
}

export interface ActionType {
  type: string;
  val?: string;
}

export type LoginInputs = { email: string; password: string };

const SignInForm = () => {
  const { onLogin } = useAuth();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid },
    watch,
  } = useForm<LoginInputs>();
  const navigate = useNavigate();
  const [emailIsValid, setEmailIsvalid] = useState<boolean | null>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean | null>(null);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    // console.log(data, isValid);

    const { email, password } = data;
    if (isValid) {
      const res = await onLogin(email, password);
      if (res === "success") {
        navigate("/todo");
      }
    }

    resetField("email");
    resetField("password");
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const emailInput = watch("email");
    setEmailIsvalid(emailRegex(emailInput));
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const passwordInput = watch("password");
    setPasswordIsValid(passwordRegex(passwordInput));
  };

  return (
    <>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          data-testid="email-input"
          isValid={emailIsValid}
          {...register("email", {
            required: true,
            onChange: emailChangeHandler,
            pattern: {
              value: emailExpression,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        <FormInput
          label="Password"
          type="password"
          data-testid="password-input"
          isValid={passwordIsValid}
          {...register("password", {
            required: true,
            onChange: passwordChangeHandler,
            pattern: {
              value: passwordExpression,
              message: "8자리 이상 비밀번호를 사용하세요.",
            },
          })}
        />
        <AppButton
          type="submit"
          data-testid="signin-button"
          isNotValid={!isValid}
        >
          {isValid ? "Sign In" : <span>&#10005;</span>}
        </AppButton>
      </AuthForm>
    </>
  );
};

export const AuthForm = styled.form`
  min-width: 500px;

  button {
    margin: 30px auto;
  }
`;

export default SignInForm;
