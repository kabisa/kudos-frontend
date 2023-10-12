import React from "react";
import { render } from "@testing-library/react";
import Button from ".";

test("renders with default state", () => {
  const { getByRole } = render(<Button text="Drop your kudos!" />);
  expect(getByRole("button")).not.toBeDisabled();
});

test("button to be disabled", () => {
  const { getByText } = render(
    <Button state="disabled" text="You can't drop your kudos" />,
  );

  const button = getByText("You can't drop your kudos");
  expect(button).toBeDisabled();
});
