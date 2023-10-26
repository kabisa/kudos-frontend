import React from "react";
import { render, screen } from "@testing-library/react";
import Button from ".";

test("renders with default state", () => {
  const { getByRole } = render(<Button text="Drop your Kudo's" />);
  expect(getByRole("button")).not.toBeDisabled();
});

test("button to be disabled", () => {
  render(<Button state="disabled" text="You cannot drop your kudos" />);

  const button = screen.getByRole("button", {
    name: /You cannot drop your kudos/i,
  });
  expect(button).toBeDisabled();
});

test("renders a button with an icon", () => {
  const { getByRole, getByText } = render(
    <Button icon="flag" text="Drop your Kudo's" />,
  );
  expect(getByRole("button")).toBeInTheDocument();
  getByText("flag");
});
