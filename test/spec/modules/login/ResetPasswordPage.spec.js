import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";

import ForgotPasswordPage from "src/modules/login/ForgotPasswordPage";

describe("ResetPasswordPage", function() {
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
        <ForgotPasswordPage />
      </MockedProvider>
    );
    expect(scratch.querySelector("h2").textContent).to.be.eq("Forgot password");
  });
});
