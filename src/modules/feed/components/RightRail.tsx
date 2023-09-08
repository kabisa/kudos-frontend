import React from "react";
import classNames from 'classnames';

import { ReactComponent as KabisaLogo } from '../../../assets/kabisa.svg';

import { Statistics } from "../../statistics";

import s from "./Rail.module.scss";
import Segment from "../../../components/atoms/Segment";
import moment from 'moment/moment';

type RightRailProps = {
    className?: string;
}

const RightRail: React.FC<RightRailProps> = ({ className }) => (
    <Segment className={ classNames(s.rail, className) } data-testid="right-tail">
        <div className={ s.header }>
            <h1 className={s.kudo_header}>₭udometer</h1>
            <p className={s.today}>{moment().format("MMMM Do, YYYY")}</p>
        </div>
        <Statistics />
        <KabisaLogo className={ s.logo }/>
    </Segment>
);

export default RightRail;
