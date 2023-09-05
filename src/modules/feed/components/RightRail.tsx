import React from "react";
import classNames from 'classnames';

import { Statistics } from "../../statistics";

import s from "./Rail.module.scss";
import Segment from "../../../components/atoms/Segment";

const slackIconPath = `${process.env.PUBLIC_URL}/assets/kabisa_logo_white.png`;

type RightRailProps = {
    className?: string;
}

const RightRail: React.FC<RightRailProps> = ({ className }) => (
    <Segment className={ classNames(s.rail, className) } data-testid="right-tail">
      <Statistics />
      <img className={s.logo} alt="Kabisa logo" src={slackIconPath} />
    </Segment>
);

export default RightRail;
