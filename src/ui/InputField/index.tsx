import React from "react";
import { Label, Input as UIInput } from "@sandercamp/ui-components";
import styles from "./styles.module.css";

export const InputType = ["number", "text", "password", "email"] as const;

export type InputFieldProps = {
  id: string;
  label: string;
  type: (typeof InputType)[number];
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  id,
  label,
  type,
  placeholder,
  onChange,
}: InputFieldProps) => {
  return (
    <div className={styles.inputContainer}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <UIInput
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
