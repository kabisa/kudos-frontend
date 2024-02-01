import { render } from "@testing-library/react";
import Currency from ".";

test("displays progress information when provided with currentKudos, neededKudos, and goal", () => {
  const { getByText } = render(<Currency amount={50} />);

  getByText("50₭");
});
