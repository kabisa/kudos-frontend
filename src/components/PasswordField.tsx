import { Input, Label } from "@kabisa/ui-components";
import React from "react";
import { ChangeEventHandler } from "react";

export const PasswordField: React.FC<{
  error?: boolean;
  value: string;
  label: string;
  placeholder?: string;
  name: string;
  testId?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ error, value, name, placeholder = name, testId, label, onChange }) => {
  return (
    <Label>
      {label}
      <Input
        data-testid={testId}
        name={name}
        type="password"
        placeholder={placeholder}
        error={error}
        value={value}
        onChange={onChange}
      />
    </Label>
  );
};
