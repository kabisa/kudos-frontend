import React from "react";
import { Segment } from "semantic-ui-react";
import { Statistics } from "../../statistics";

import s from "./Rail.module.scss";

const slackIconPath = `${process.env.PUBLIC_URL}/assets/kabisa_logo_white.png`;

const RightRail = () => (
  <Segment className={s.rail}>
    <Statistics />
    <img className={s.logo} alt="Kabisa logo" src={slackIconPath} />
  </Segment>
);

export default RightRail;
