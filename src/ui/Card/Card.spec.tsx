import { render } from "@testing-library/react";
import Card from ".";

test("renders with default state", () => {
  const { getByText } = render(<Card>I am a card</Card>);
  expect(getByText("I am a card")).toBeInTheDocument;
});
