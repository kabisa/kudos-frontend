import { h, render } from "preact";
import { ResetPasswordPage } from "src/modules/login/pages/ResetPasswordPage";

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
    mount(<ResetPasswordPage />);
    expect(scratch.querySelector("h2").textContent).to.be.eq("Reset password");
  });
});
