import React from "react";
import { Button as UIButton } from "@sandercamp/ui-components";

export const ButtonVariants = ["primary", "secondary"] as const;
export type ButtonProps = {
  variant: (typeof ButtonVariants)[number];
  text: string;
};
const Button = ({ variant = "primary", text }: ButtonProps) => (
  <UIButton variant={variant}>{text}</UIButton>
);

export default Button;
