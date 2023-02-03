import AppButton from "@styles/button/AppButton";
import FormInput from "@styles/FormInput";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
  useState,
} from "react";

import {
  ActionType,
  AuthForm,
  emailReducer,
  passwordReducer,
  State,
} from "./SignInForm";

const confirmPasswordReducer = (state: State, action: ActionType): State => {
  if (action.type === "USER_INPUT") {
    if (action.val)
      return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  return { value: "", isValid: null };
};

const SignUpForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [confirmPasswordState, dispatchConfirmPassword] = useReducer(
    confirmPasswordReducer,
    {
      value: "",
      isValid: null,
    }
  );

  const { value: email, isValid: emailIsValid } = emailState;
  const { value: password, isValid: passwordIsValid } = passwordState;
  const { value: confirmPassword, isValid: confirmPasswordIsValid } =
    confirmPasswordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        !!emailIsValid && !!passwordIsValid && !!confirmPasswordIsValid
      );
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, confirmPasswordIsValid]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formIsValid) {
      // sign up 제출 코드
      console.log(email, password);
    }
    dispatchEmail({ type: "RESET" });
    dispatchPassword({ type: "RESET" });
    dispatchConfirmPassword({ type: "RESET" });
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const confirmPasswordChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatchConfirmPassword({ type: "USER_INPUT", val: event.target.value });
  };

  return (
    <>
      <AuthForm onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          required
          isValid={emailIsValid}
          onChange={emailChangeHandler}
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          required
          isValid={passwordIsValid}
          onChange={passwordChangeHandler}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          isValid={confirmPasswordIsValid}
          onChange={confirmPasswordChangeHandler}
        />
        <AppButton type="submit" isNotValid={!formIsValid}>
          {formIsValid ? "Sign Up" : <span>&#10005;</span>}
        </AppButton>
      </AuthForm>
    </>
  );
};

export default SignUpForm;
