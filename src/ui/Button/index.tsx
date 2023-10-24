import React from "react";
import { Icon, Button as UIButton } from "@sandercamp/ui-components";
import styles from "./styles.module.css";

export const ButtonVariants = ["primary", "secondary"] as const;
export const ButtonStates = ["default", "disabled"] as const;

type IconProps = {
  icon: string;
  text?: string;
};

type TextProps = {
  text: string;
  icon?: string;
};

export type ButtonProps = {
  variant?: (typeof ButtonVariants)[number];
  state?: (typeof ButtonStates)[number];
} & (IconProps | TextProps);

const Button = ({ variant = "primary", state, text, icon }: ButtonProps) => (
  <UIButton
    variant={variant}
    disabled={state === "disabled" || false}
    className={styles.button}
  >
    <span>
      {icon && <Icon className={styles.icon} name={icon} />}
      {text && <span>{text}</span>}
    </span>
  </UIButton>
);

export default Button;
