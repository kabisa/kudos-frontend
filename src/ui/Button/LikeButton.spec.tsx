import { render } from "@testing-library/react";
import { LikeButton } from "./LikeButton";

test("renders a like button", () => {
  const { getByRole, getByText } = render(
    <LikeButton liked={false} onClick={() => {}} />,
  );

  getByRole("button");
  getByText("1₭");
});
