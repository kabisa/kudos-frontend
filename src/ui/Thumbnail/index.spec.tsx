import { render } from "@testing-library/react";

import Thumbnail from ".";

describe("<Thumbnail/>", () => {
  const props = {
    src: "assets/test.jpg",
    alt: "test",
  };

  test("renders an img with provided alt text", () => {
    const { getByRole } = render(<Thumbnail {...props} />);

    const element = getByRole("img");

    expect(element).toHaveAttribute("alt", props.alt);
  });

  test("renders an img with provided src", () => {
    const { getByRole } = render(<Thumbnail {...props} />);

    const element = getByRole("img");

    expect(element).toHaveAttribute("src", props.src);
  });
});
