import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";

import RegisterPage from "src/modules/login/RegisterPage";

describe("RegisterPage", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("renders the correct text", function() {
    mount(
      <MockedProvider>
        <RegisterPage />
      </MockedProvider>
    );
    expect(scratch.getElementsByClassName("input").length).to.be.eq(3);
  });
});
