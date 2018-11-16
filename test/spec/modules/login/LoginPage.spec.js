import { h, render } from "preact";
import { MockedProvider } from "react-apollo/test-utils";

import LoginPage from "src/modules/login/LoginPage";

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
    mount(
      <MockedProvider>
        <LoginPage />
      </MockedProvider>
    );
    expect(scratch.getElementsByClassName("input").length).to.be.eq(2);
  });
});
