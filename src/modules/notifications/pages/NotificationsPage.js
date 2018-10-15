import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Navigation } from "../../../components/navigation";

export class NotificationsPage extends Component {
  constructor(props) {
    super(props);
    this.attributes = {
      transition: "none"
    };
  }
  render() {
    return (
      <div>
        <p>NotificationsPage</p>
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
)(NotificationsPage);
