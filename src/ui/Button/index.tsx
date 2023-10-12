import { Button as UIButton } from "@sandercamp/ui-components";

type ButtonProps = {
  variant: "primary";
  text: string;
};
const Button = ({ variant = "primary", text }: ButtonProps) => (
  <UIButton>{text}</UIButton>
);

export default Button;
