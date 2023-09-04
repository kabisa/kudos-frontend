import { Statistics } from "../../statistics";

import s from "./Rail.module.scss";
import Segment from "../../../components/atoms/Segment";

const slackIconPath = `${process.env.PUBLIC_URL}/assets/kabisa_logo_white.png`;

const RightRail = () => (
  <div data-testid="right-tail">
    <Segment className={s.rail}>
      <Statistics />
      <img className={s.logo} alt="Kabisa logo" src={slackIconPath} />
    </Segment>
  </div>
);

export default RightRail;
