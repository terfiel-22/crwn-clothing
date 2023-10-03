import { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";
import { BUTTON_TYPE_CLASSES } from "./button.type";

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
  buttonOptions?: ButtonHTMLAttributes<HTMLButtonElement>;
};
const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  buttonType,
  isLoading,
  buttonOptions,
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...buttonOptions}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
