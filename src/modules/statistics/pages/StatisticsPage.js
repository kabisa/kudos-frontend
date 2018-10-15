import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Navigation } from "../../../components/navigation";

export class StatisticsPage extends Component {
  render() {
    return (
      <div>
        <p>StatisticsPage</p>
        <Navigation />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsPage);
