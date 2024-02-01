import { render, screen } from "@testing-library/react";
import SelectWrapper from ".";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

test("renders a single-select component", () => {
  const { container } = render(
    <SelectWrapper options={options} label="Select a fruit" />,
  );

  expect(container).toBeInTheDocument();
  expect(screen.getByText("Select a fruit")).toBeInTheDocument();
});

test("renders a multi-select component", () => {
  const { container } = render(
    <SelectWrapper options={options} isMulti={true} label="Select fruits" />,
  );

  expect(container).toBeInTheDocument();
  expect(screen.getByText("Select fruits")).toBeInTheDocument();
});
