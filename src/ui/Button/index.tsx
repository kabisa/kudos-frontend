import React from "react";
import { Button as UIButton } from "@sandercamp/ui-components";

export type ButtonProps = {
  variant: "primary";
  text: string;
};
const Button = ({ variant = "primary", text }: ButtonProps) => (
  <UIButton variant={variant}>{text}</UIButton>
);

export default Button;
