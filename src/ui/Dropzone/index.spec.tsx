import { screen } from "@testing-library/react";
import { setComponent } from "../../support/testing/testComponent";
import Dropzone from ".";

describe("<Dropzone/>", () => {
  const { renderComponent } = setComponent(Dropzone, {
    props: { label: "Drop it!" },
  });

  test("renders an img with provided alt text", () => {
    renderComponent();

    const label = screen.queryByText("Drop it!");
    expect(label).toBeInTheDocument();
  });
});
