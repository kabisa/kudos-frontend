import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Button, Image } from "semantic-ui-react";
import PropTypes from "prop-types";

import { Navigation } from "../../../components/navigation";
import { logout } from "../actions";
import { route } from "preact-router";
import { PATH_LOGIN } from "../../../routes";

export class UserPage extends Component {
  constructor(props) {
    super(props);

    // Check login
    if (!props.isLoggedIn) {
      route(PATH_LOGIN, true);
    }

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { avatarUrl, name, location } = this.props;
    return (
      <div style={{ height: "100%" }}>
        <div className="page flex">
          <div>
            <Image
              src={avatarUrl}
              circular
              style={{ margin: "auto", marginTop: "2rem" }}
            />
            <h2 style={{ marginBottom: 0 }}>{name}</h2>
            <span style={{ color: "grey" }}>{location}</span>
          </div>
          <Button
            color="red"
            onClick={this.logout}
            style={{ margin: "auto", display: "block" }}
          >
            Log out
          </Button>
        </div>

        <Navigation />
      </div>
    );
  }
}

UserPage.propTypes = {
  logout: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  avatarUrl: state.user.data ? state.user.data.avatar_url : "",
  location: state.user.data ? state.user.data.location : "",
  name: state.user.data
    ? `${state.user.data.first_name} ${state.user.data.last_name}`
    : "",
  isLoggedIn: state.user.token !== null
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
