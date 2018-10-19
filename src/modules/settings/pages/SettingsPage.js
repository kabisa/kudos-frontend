import { h, Component } from "preact";
import PropTypes from "prop-types";
import { connect } from "preact-redux";
import { Button } from "semantic-ui-react";
import { route } from "preact-router";

import { PATH_CHOOSE_TEAM } from "../../../routes";
import { Navigation } from "../../../components/navigation";
import { PATH_LOGIN } from "../../../routes";

export class SettingsPage extends Component {
  constructor(props) {
    super(props);

    // Check login
    if (!props.isLoggedIn) {
      route(PATH_LOGIN, true);
    }
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <div
          className="page flex"
          style={{ justifyContent: "space-between", padding: "2em" }}
        >
          <div>
            <h2>Settings</h2>
          </div>
          <a href={PATH_CHOOSE_TEAM}>
            <Button color="orange" style={{ width: "100%" }}>
              Switch team
            </Button>
          </a>
        </div>
        <Navigation />
      </div>
    );
  }
}

SettingsPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.token !== null,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
