import { h, Component } from "preact";

import { Navigation } from "../../components/navigation";
import { auth } from "../../support";
import { DonutChart } from "./components";

export class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    auth();
  }

  render() {
    return (
      <div>
        <DonutChart value={50} />
        <Navigation />
      </div>
    );
  }
}

export default StatisticsPage;
