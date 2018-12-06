import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";

import ResetPasswordPage from "src/modules/user/ResetPasswordPage";

describe("ResetPasswordPage", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("has three input elements", function() {
    mount(
      <MockedProvider>
        <ResetPasswordPage />
      </MockedProvider>
    );
    expect(scratch.getElementsByClassName("input").length).to.be.eq(3);
  });
});
