import React from "react";
import { Button as UIButton } from "@sandercamp/ui-components";

export const ButtonVariants = ["primary", "secondary"] as const;
export const ButtonStates = ["default", "disabled"] as const;

export type ButtonProps = {
  variant?: (typeof ButtonVariants)[number];
  state?: (typeof ButtonStates)[number];
  text: string;
};
const Button = ({ variant = "primary", state, text }: ButtonProps) => (
  <UIButton variant={variant} disabled={state === "disabled"}>
    {text}
  </UIButton>
);

export default Button;
