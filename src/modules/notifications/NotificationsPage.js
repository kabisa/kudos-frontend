import React, { Component } from "react";

import { Navigation } from "../../components/navigation";
import { auth } from "../../support";

import s from "./NotificationsPage.module.scss";

export class NotificationsPage extends Component {
  constructor(props) {
    super(props);
    auth();
  }

  render() {
    return (
      <div>
        <div className={s.page}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2 style={{ margin: "auto" }}>Work in progress</h2>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default NotificationsPage;
