import { render, screen } from "@testing-library/react";
import InputField from ".";

test("given an element type input (by default), it renders a input field", () => {
  render(
    <InputField
      id="input"
      label="Enter some text"
      type="text"
      placeholder="Placeholder"
    />,
  );

  const inputElement = screen.getByLabelText("Enter some text");
  expect(inputElement).toHaveAttribute("id", "input");
  expect(inputElement).toHaveAttribute("type", "text");
  expect(inputElement).toHaveAttribute("placeholder", "Placeholder");
  expect(inputElement.tagName).toBe("INPUT");
});

test("given an element type textarea, it renders a textarea field", () => {
  render(
    <InputField
      elementType="textarea"
      id="textfield-1"
      label="Enter some text"
      placeholder="Placeholder"
    />,
  );

  const inputElement = screen.getByLabelText("Enter some text");
  expect(inputElement).toHaveAttribute("id", "textfield-1");
  expect(inputElement).toHaveAttribute("placeholder", "Placeholder");
  expect(inputElement.tagName).toBe("TEXTAREA");
});
