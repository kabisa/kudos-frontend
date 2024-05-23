import { render } from "@testing-library/react";

import Dropzone from ".";

describe("<Dropzone/>", () => {
  const props = {
    label: "Drop it!",
  };

  test("renders an img with provided alt text", () => {
    const { queryByText } = render(<Dropzone {...props} />);

    const label = queryByText(props.label);

    expect(label).toBeInTheDocument();
  });
});
