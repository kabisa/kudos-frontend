import { FC } from "react";

import classNames from "classnames";

import { ReactComponent as KabisaLogo } from "../../../assets/kabisa.svg";

import { Statistics } from "../../statistics";

import s from "./Rail.module.scss";
import Segment from "../../../components/atoms/Segment";
import moment from "moment/moment";

type RightRailProps = {
  className?: string;
};

const RightRail: FC<RightRailProps> = ({ className }) => (
  <Segment className={classNames(s.rail, className)} data-testid="right-tail">
    <header className={s.header}>
      <h1 className={s.kudo_header}>₭udometer</h1>
      <p className={s.today}>{moment().format("MMMM Do, YYYY")}</p>
    </header>
    <Statistics />
    <footer className={s.footer}>
      <KabisaLogo className={s.logo} />
    </footer>
  </Segment>
);

export default RightRail;
