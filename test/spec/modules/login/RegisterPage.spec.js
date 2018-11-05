import { h, render } from "preact";
import { RegisterPage } from "src/modules/login/pages/RegisterPage";

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
    mount(<RegisterPage />);
    expect(scratch.getElementsByClassName("input").length).to.be.eq(3);
  });
});
