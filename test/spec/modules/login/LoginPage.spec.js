import { h, render } from "preact";
import { LoginPage } from "src/modules/login/pages/LoginPage";

describe("LoginPage", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("has two input elements", function() {
    mount(<LoginPage />);
    expect(scratch.getElementsByClassName("input").length).to.be.eq(2);
  });
});
