import { h } from "preact";
import { shallow } from "enzyme";
import ActionButton from "./ActionButton";

it("should render self and subcomponents", () => {
  shallow(<ActionButton />);
});
