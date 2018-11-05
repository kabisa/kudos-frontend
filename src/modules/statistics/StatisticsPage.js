import { h, Component } from "preact";
import { Navigation } from "../../components/navigation";
import { auth } from "../../support";

export class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    auth();
  }

  render() {
    return (
      <div>
        <p>StatisticsPage</p>
        <Navigation />
      </div>
    );
  }
}

export default StatisticsPage;
