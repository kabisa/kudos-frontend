import { h } from "preact";
import { shallow } from "enzyme";

import { SettingsPage } from "./SettingsPage";

it("should render self and subcomponents", () => {
  shallow(<SettingsPage />);
});
