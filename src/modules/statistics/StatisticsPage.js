import { h, Component } from "preact";

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
          <Statistics lineSize={2} />
        </div>
        <Navigation />
      </div>
    );
  }
}

export default StatisticsPage;
