import { Statistics } from "../../statistics";
import classNames from "classnames";

import s from "./Rail.module.scss";

const slackIconPath = `${process.env.PUBLIC_URL}/assets/kabisa_logo_white.png`;

const RightRail = () => (
  <div data-testid="right-tail">
    <div className={classNames("ui segment", s.rail)}>
      <Statistics />
      <img className={s.logo} alt="Kabisa logo" src={slackIconPath} />
    </div>
  </div>
);

export default RightRail;
