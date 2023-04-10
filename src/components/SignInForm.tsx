import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from "react";
import AppButton from "@styles/button/AppButton";
import FormInput from "@styles/FormInput";
import styled from "styled-components";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

export interface State {
  value: string;
  isValid: boolean | null;
}

export interface ActionType {
  type: string;
  val?: string;
}

type Inputs = { email: string; password: string };

export const emailReducer = (state: State, action: ActionType): State => {
  if (action.type === "USER_INPUT") {
    if (action.val)
      return {
        value: action.val,
        isValid: action.val.includes("@"),
      };
  }
  return { value: "", isValid: null };
};

export const passwordReducer = (state: State, action: ActionType): State => {
  if (action.type === "USER_INPUT") {
    if (action.val)
      return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  return { value: "", isValid: null };
};

const SignInForm = () => {
  const { onLogin } = useAuth();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const { value: email, isValid: emailIsValid } = emailState;
  const { value: password, isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(!!emailIsValid && !!passwordIsValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    const { email, password } = data;
    if (formIsValid) {
      const res = await onLogin(email, password);
      if (res === "success") {
        navigate("/todo");
      }
    }
    resetField("email");
    resetField("password");
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
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
            pattern: /^\S+@\S+$/i,
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
            minLength: 8,
          })}
        />
        <AppButton
          type="submit"
          data-testid="signin-button"
          isNotValid={!formIsValid}
        >
          {formIsValid ? "Sign In" : <span>&#10005;</span>}
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
