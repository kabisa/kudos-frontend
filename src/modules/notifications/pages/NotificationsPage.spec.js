import { h } from "preact";
import { shallow } from "enzyme";

import { NotificationsPage } from "./NotificationsPage";

it("should render self and subcomponents", () => {
  shallow(<NotificationsPage />);
});
