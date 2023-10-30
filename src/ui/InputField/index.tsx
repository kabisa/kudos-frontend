import React from "react";
import { Label, Input as UIInput } from "@sandercamp/ui-components";
import styles from "./styles.module.css";

export const InputType = ["number", "text", "password", "email"] as const;

export type InputFieldProps = {
  elementType?: "input" | "textarea";
  id: string;
  label: string;
  type?: (typeof InputType)[number];
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  value?: string;
};

const InputField = ({ elementType = "input", ...props }: InputFieldProps) => {
  return elementType === "input" ? (
    <InputContainer {...props} />
  ) : (
    <TextAreaContainer {...props} />
  );
};

const InputContainer = ({
  label,
  id,
  type = "text",
  placeholder,
  onChange,
  value,
}: InputFieldProps) => (
  <div className={styles.inputContainer}>
    {label && <Label htmlFor={id}>{label}</Label>}
    <UIInput
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  </div>
);

const TextAreaContainer = ({
  label,
  id,
  placeholder,
  onChange,
  value,
}: InputFieldProps) => (
  <div className={styles.inputContainer}>
    {label && <Label htmlFor={id}>{label}</Label>}
    <textarea
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  </div>
);
export default InputField;
