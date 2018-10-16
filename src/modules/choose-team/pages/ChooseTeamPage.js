import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Divider } from "semantic-ui-react";
import PropTypes from "prop-types";

import { Toolbar } from "../../../components/navigation";
import { PATH_LOGIN } from "../../../routes";
import InviteItem from "./components/Invite";
import TeamRow from "./components/TeamRow";
import { route } from "preact-router";

export class ChooseTeamPage extends Component {
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
        <Toolbar text="Choose a group" />
        <div className="flex" style={{ padding: "75px 2em 0 2em" }}>
          <h2>Your invites</h2>
          <InviteItem />
          <InviteItem />
          <InviteItem />
          <Divider />
          <h2>Your teams</h2>
          <TeamRow />
        </div>
      </div>
    );
  }
}

ChooseTeamPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.token !== null
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTeamPage);
