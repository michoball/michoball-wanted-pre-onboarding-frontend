import { useMemo } from "react";
import AppButton from "@styles/button/AppButton";
import FormInput from "@styles/input/FormInput";
import { AuthForm, LoginInputs } from "./SignInForm";
import useAuthMutation from "@hooks/mutations/useAuthMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "@utils/regex";

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
  const emailInput = watch("email");
  const passwordInput = watch("password");
  const confirmPassword = watch("passwordConfirm");

  const emailIsValid = useMemo(
    () => (!emailInput ? null : emailRegex(emailInput)),
    [emailInput]
  );
  const passwordIsValid = useMemo(
    () => (!passwordInput ? null : passwordRegex(passwordInput)),
    [passwordInput]
  );
  const passwordConfirmIsValid = useMemo(
    () => (!confirmPassword ? null : passwordInput === confirmPassword),
    [passwordInput, confirmPassword]
  );

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    const { email, password } = data;
    if (isValid) {
      onSignUp({ email, password });
    }
    resetField("email");
    resetField("password");
    resetField("passwordConfirm");
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
            validate: (value) => emailRegex(value),
          })}
        />
        <FormInput
          label="Password"
          type="password"
          isValid={passwordIsValid}
          errorMessage="8자리 이상 비밀번호를 사용하세요."
          {...register("password", {
            required: true,
            validate: (value) => passwordRegex(value),
          })}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          isValid={passwordConfirmIsValid}
          errorMessage="비밀번호와 일치하지 않습니다."
          {...register("passwordConfirm", {
            required: true,
            validate: (value) => passwordInput === value,
          })}
        />
        <AppButton type="submit" isNotValid={!isValid}>
          {isValid ? "Sign Up" : <span>&#10005;</span>}
        </AppButton>
      </AuthForm>
    </>
  );
};

export default SignUpForm;
