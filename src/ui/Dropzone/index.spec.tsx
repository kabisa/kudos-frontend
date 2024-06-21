import { screen } from "@testing-library/react";
import { setTestSubject } from "../../support/testing/testSubject";
import Dropzone from ".";

describe("<Dropzone/>", () => {
  const { renderComponent } = setTestSubject(Dropzone, {
    props: { label: "Drop it!" },
  });

  test("renders an img with provided alt text", () => {
    renderComponent();

    const label = screen.queryByText("Drop it!");
    expect(label).toBeInTheDocument();
  });
});
