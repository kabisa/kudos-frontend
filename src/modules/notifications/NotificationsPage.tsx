import React, {Component} from "react";

import {Navigation} from "../../components/navigation";

import s from "./NotificationsPage.module.scss";

export interface Props {
    // Future props go here
}

export class NotificationsPage extends Component <Props> {
    render() {
        return (
            <div>
                <div className={s.page}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <h2 style={{margin: "auto"}}>Work in progress</h2>
                    </div>
                </div>
                <Navigation/>
            </div>
        );
    }
}

export default NotificationsPage;
