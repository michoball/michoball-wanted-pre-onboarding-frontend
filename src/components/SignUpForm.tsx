import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AppButton from "@styles/button/AppButton";
import FormInput from "@styles/FormInput";
import AuthContext from "context/authContext";
import {
  ActionType,
  AuthForm,
  emailReducer,
  passwordReducer,
  State,
} from "./SignInForm";
import { useNavigate } from "react-router-dom";

const confirmPasswordReducer = (state: State, action: ActionType): State => {
  if (action.type === "USER_INPUT") {
    if (action.val)
      return { value: action.val, isValid: action.val.trim().length >= 8 };
  }
  return { value: "", isValid: null };
};

const SignUpForm = () => {
  const { onSignUp } = useContext(AuthContext);
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
      onSignUp(email, password);
      navigate("/signin");
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
          data-testid="email-input"
          value={email}
          required
          isValid={emailIsValid}
          onChange={emailChangeHandler}
        />
        <FormInput
          label="Password"
          type="password"
          data-testid="password-input"
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
        <AppButton
          type="submit"
          data-testid="signup-button"
          isNotValid={!formIsValid}
        >
          {formIsValid ? "Sign Up" : <span>&#10005;</span>}
        </AppButton>
      </AuthForm>
    </>
  );
};

export default SignUpForm;
