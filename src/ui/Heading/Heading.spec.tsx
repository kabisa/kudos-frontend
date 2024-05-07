import { render } from "@testing-library/react";
import Heading from ".";

test("renders with default state", () => {
  const { getByRole } = render(
    <Heading tag="h1" size="primary">
      Heading
    </Heading>,
  );
  expect(getByRole("heading", { level: 1 })).toHaveTextContent("Heading");
});
