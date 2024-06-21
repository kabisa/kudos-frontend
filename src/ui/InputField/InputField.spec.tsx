import { render, screen } from "@testing-library/react";
import InputField from ".";
import { setComponent } from "../../support/testing/testComponent";

describe("InputField", () => {
  const { renderComponent, updateProps } = setComponent(InputField, {
    props: {
      id: "input",
      label: "Enter some text",
      type: "text",
      placeholder: "Placeholder",
    },
  });

  test("given an element type input (by default), it renders a input field", () => {
    renderComponent();

    const inputElement = screen.getByLabelText("Enter some text");
    expect(inputElement).toHaveAttribute("id", "input");
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("placeholder", "Placeholder");
    expect(inputElement.tagName).toBe("INPUT");
  });

  test("given an element type textarea, it renders a textarea field", () => {
    updateProps({ id: "textfield-1", elementType: "textarea" });
    renderComponent();

    const inputElement = screen.getByLabelText("Enter some text");
    expect(inputElement).toHaveAttribute("id", "textfield-1");
    expect(inputElement).toHaveAttribute("placeholder", "Placeholder");
    expect(inputElement.tagName).toBe("TEXTAREA");
  });
});
