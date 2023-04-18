import { useMemo } from "react";
import AppButton from "@styles/button/AppButton";
import FormInput from "@styles/input/FormInput";
import styled from "styled-components";
import useAuthMutation from "@hooks/mutations/useAuthMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "@utils/regex";

export type LoginInputs = { email: string; password: string };

const SignInForm = () => {
  const { useLoginMutate } = useAuthMutation();
  const { mutate: onLogin } = useLoginMutate();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid },
    watch,
  } = useForm<LoginInputs>();

  const emailInput = watch("email");
  const passwordInput = watch("password");

  const emailIsValid = useMemo(
    () => (!emailInput ? null : emailRegex(emailInput)),
    [emailInput]
  );
  const passwordIsValid = useMemo(
    () => (!passwordInput ? null : passwordRegex(passwordInput)),
    [passwordInput]
  );

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const { email, password } = data;
    if (isValid) {
      onLogin({ email, password });
    }

    resetField("email");
    resetField("password");
  };

  return (
    <>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          isValid={emailIsValid}
          errorMessage="이메일 형식에 맞지 않습니다."
          {...register("email", {
            required: true,
          })}
        />
        <FormInput
          label="Password"
          type="password"
          isValid={passwordIsValid}
          errorMessage="8자리 이상 비밀번호를 사용하세요."
          {...register("password", {
            required: true,
          })}
        />
        <AppButton type="submit" isNotValid={!isValid}>
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
