import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Divider } from "semantic-ui-react";
import PropTypes from "prop-types";

import { Toolbar } from "../../../components/navigation";
import { Invite, TeamRow } from "./components";
import { isLoggedIn } from "../../support";

import s from "./ChooseTeamPage.scss";

export class ChooseTeamPage extends Component {
  constructor(props) {
    super(props);
    isLoggedIn();
  }

  render() {
    return (
      <div>
        <Toolbar text="Choose a group" />
        <div className={s.page}>
          <h2>Your invites</h2>
          <Invite />
          <Invite />
          <Invite />
          <Divider />
          <h2>Your teams</h2>
          <TeamRow />
        </div>
      </div>
    );
  }
}

ChooseTeamPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.token !== null,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTeamPage);
