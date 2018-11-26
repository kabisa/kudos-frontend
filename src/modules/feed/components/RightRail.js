import { h } from "preact";
import { Segment } from "semantic-ui-react";
import { Statistics } from "../../statistics";

import s from "./Rail.scss";

export default () => (
  <Segment
    className={s.rail}
    style={{ height: "80%", maxHeight: "640px", overflow: "auto" }}
  >
    <Statistics />
  </Segment>
);
