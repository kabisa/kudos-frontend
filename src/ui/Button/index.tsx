import React from "react";
import { Icon, Button as UIButton } from "@kabisa/ui-components";
import styles from "./styles.module.css";
import { ButtonVariant, GenericButtonVariant } from "./types";
import { LikeButton } from "./LikeButton";

export const ButtonStates = ["default", "disabled"] as const;

type IconProps = {
  icon: string;
  text?: string;
};

type TextProps = {
  text: string;
  icon?: string;
};

export type GenericButtonProps = {
  variant: GenericButtonVariant;
  onClick?: () => void;
  state?: (typeof ButtonStates)[number];
} & (IconProps | TextProps);

const GenericButton = ({
  variant = "primary",
  state,
  text,
  icon,
  onClick
}: GenericButtonProps) => (
  <UIButton
    variant={variant}
    disabled={state === "disabled" || false}
    className={styles.button}
    onClick={onClick}
  >
    <span>
      {icon && <Icon className={styles.icon} name={icon} />}
      {text && <span>{text}</span>}
    </span>
  </UIButton>
);

export type ButtonProps = Omit<GenericButtonProps, "variant"> & {
  variant?: ButtonVariant;
};

const Button = ({ variant = "primary", ...rest }: ButtonProps) => {
  const buttonTypes: { [key in ButtonVariant]: React.ElementType } = {
    primary: GenericButton,
    secondary: GenericButton,
    tertiary: GenericButton,
    like: LikeButton,
  };

  const Component = buttonTypes[variant];

  return <Component variant={variant} {...rest} />;
};

export default Button;
