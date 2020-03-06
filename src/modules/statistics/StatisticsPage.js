import React, { Component } from "react";

import { Navigation } from "../../components/navigation";
import { auth } from "../../support";

import s from "./style.scss";
import Statistics from "./Statistics";

export class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    auth();
  }

  render() {
    return (
      <div>
        <div className={s.root}>
          <div style={{ paddingBottom: "2em" }}>
            <Statistics lineSize={2} />
          </div>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default StatisticsPage;
