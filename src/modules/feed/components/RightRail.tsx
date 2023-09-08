import React from "react";
import classNames from 'classnames';

import { ReactComponent as KabisaLogo } from '../../../assets/kabisa.svg';

import { Statistics } from "../../statistics";

import s from "./Rail.module.scss";
import Segment from "../../../components/atoms/Segment";

type RightRailProps = {
    className?: string;
}

const RightRail: React.FC<RightRailProps> = ({ className }) => (
    <Segment className={ classNames(s.rail, className) } data-testid="right-tail">
        <Statistics />
        <KabisaLogo className={ s.logo }/>
    </Segment>
);

export default RightRail;
