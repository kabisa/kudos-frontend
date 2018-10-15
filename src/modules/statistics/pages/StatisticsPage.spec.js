import { h } from "preact";
import { shallow } from "enzyme";

import { StatisticsPage } from "./StatisticsPage";

it("should render self and subcomponents", () => {
  shallow(<StatisticsPage />);
});
