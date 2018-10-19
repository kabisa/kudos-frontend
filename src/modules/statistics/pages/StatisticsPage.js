import { h, Component } from "preact";
import PropTypes from "prop-types";
import { connect } from "preact-redux";
import { Navigation } from "../../../components/navigation";
import { route } from "preact-router";
import { PATH_LOGIN } from "../../../routes";

export class StatisticsPage extends Component {
  constructor(props) {
    super(props);

    // Check login
    if (!props.isLoggedIn) {
      route(PATH_LOGIN, true);
    }
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

StatisticsPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.token !== null,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsPage);
