import { h, render } from "preact";
import { ResetPasswordPage } from "src/modules/user/pages/ResetPasswordPage";

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
    mount(<ResetPasswordPage />);
    expect(scratch.getElementsByClassName("input").length).to.be.eq(3);
  });
});
