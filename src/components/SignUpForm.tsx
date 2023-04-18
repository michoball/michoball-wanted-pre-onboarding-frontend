import { ChangeEvent, useState } from "react";
import AppButton from "@styles/button/AppButton";
import FormInput from "@styles/FormInput";
import { AuthForm, LoginInputs } from "./SignInForm";
import useAuthMutation from "@hooks/mutations/useAuthMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  emailExpression,
  emailRegex,
  passwordExpression,
  passwordRegex,
} from "@utils/regex";

type SignUpInputs = { passwordConfirm: string } & LoginInputs;

const SignUpForm = () => {
  const { useSignUpMutate } = useAuthMutation();
  const { mutate: onSignUp } = useSignUpMutate();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid },
    watch,
  } = useForm<SignUpInputs>();
  const [emailIsValid, setEmailIsvalid] = useState<boolean | null>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean | null>(null);
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState<
    boolean | null
  >(null);

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    const { email, password } = data;
    if (isValid) {
      onSignUp({ email, password });
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

  const confirmPasswordChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const passwordInput = watch("password");
    const confirmPassword = watch("passwordConfirm");
    setPasswordConfirmIsValid(confirmPassword === passwordInput);
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          isValid={passwordConfirmIsValid}
          {...register("passwordConfirm", {
            required: true,
            onChange: confirmPasswordChangeHandler,
            validate: (value) => watch("password") === value,
          })}
        />
        <AppButton
          type="submit"
          data-testid="signup-button"
          isNotValid={!isValid}
        >
          {isValid ? "Sign Up" : <span>&#10005;</span>}
        </AppButton>
      </AuthForm>
    </>
  );
};

export default SignUpForm;
