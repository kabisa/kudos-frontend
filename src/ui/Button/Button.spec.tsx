import React from "react";
import { render } from "@testing-library/react";
import Button from ".";

test("renders with default state", () => {
  const { getByRole } = render(<Button>Drop your kudos!</Button>);
  expect(getByRole("button")).not.toBeDisabled();
});

test("button to be disabled", () => {
  const { getByText } = render(
    <Button state="disabled">You cannot drop your kudos</Button>,
  );

  const button = getByText("You cannot drop your kudos");
  expect(button).toBeDisabled();
});
