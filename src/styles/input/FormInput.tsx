import React from "react";
import styles from "./FormInput.module.css";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isValid: boolean | null;
  errorMessage: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, isValid, errorMessage, ...otherProps }, ref) => {
    return (
      <div
        className={`${styles.control} ${
          isValid === false ? styles.invalid : ""
        }`}
      >
        <label htmlFor={label}>{label}</label>
        <input {...otherProps} ref={ref} />
        {isValid === false && <span>{errorMessage}</span>}
      </div>
    );
  }
);

export default FormInput;
