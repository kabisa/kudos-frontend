import React, {Component} from "react";

import {Navigation} from "../../components/navigation";

import s from "./Statistics.module.scss";
import Statistics from "./Statistics";

export interface Props {
    // Future props go here
}

export interface State {
    // Future state vars go here
}

export class StatisticsPage extends Component <Props, State> {

    render() {
        return (
            <div>
                <div className={s.root}>
                    <div style={{paddingBottom: "2em"}}>
                        <Statistics/>
                    </div>
                </div>
                <Navigation/>
            </div>
        );
    }
}

export default StatisticsPage;
