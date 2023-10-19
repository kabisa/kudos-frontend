import { render } from "@testing-library/react";
import { Card } from ".";

test("renders with default state", () => {
  const { getByText } = render(
    <Card
      theme="light"
      title={{
        text: "I am a card",
        iconName: "flag",
      }}
      content="content"
      footer="footer"
    />,
  );
  expect(getByText("I am a card")).toBeInTheDocument;
});
