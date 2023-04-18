import { FC, ButtonHTMLAttributes } from "react";
import { BaseButton, InvertedButton } from "./AppButton.styles";

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  inverted = "inverted",
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isNotValid?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const AppButton: FC<ButtonProps> = ({
  children,
  buttonType,
  isNotValid,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isNotValid} {...otherProps}>
      {children}
    </CustomButton>
  );
};

export default AppButton;
