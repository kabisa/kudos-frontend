import { render } from "@testing-library/react";
import { Card } from ".";

test("given an icon name, renders an icon", () => {
  const { getByText } = render(
    <Card
      theme="light"
      title={{
        text: "Kudometer",
        iconName: "flag",
      }}
      content="content"
      footer="footer"
    />,
  );

  getByText("Kudometer");
  getByText("flag");
});

test("render a default card with mandatory settings", () => {
  const { getByText } = render(
    <Card
      title={{
        text: "Kudometer",
      }}
      content="content"
    />,
  );

  getByText("Kudometer");
  getByText("content");
});
