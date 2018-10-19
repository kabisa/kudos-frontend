import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Button, Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import { route } from "preact-router";

import { Navigation } from "../../../components/navigation";
import { logout } from "../actions";
import { PATH_LOGIN, PATH_RESET_PASSWORD } from "../../../routes";
import s from "./UserPage.scss";

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
      <div>
        <div
          className="page flex"
          style={{ padding: "2em", justifyContent: "space-between" }}
        >
          <div>
            <Image src={avatarUrl} circular className={s.image} />
            <h2 className={s.name}>{name}</h2>
            <span className={s.sub_text}>{location}</span>
          </div>
          <div>
            <a
              href={`${PATH_RESET_PASSWORD}?transition=slideup`}
              className={s.button_wrapper}
            >
              <Button color="orange" className={s.button}>
                Reset password
              </Button>
            </a>
            <Button color="red" onClick={this.logout} className={s.button}>
              Log out
            </Button>
          </div>
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
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  avatarUrl: state.user.data ? state.user.data.avatar_url : "",
  location: state.user.data ? state.user.data.location : "",
  name: state.user.data
    ? `${state.user.data.first_name} ${state.user.data.last_name}`
    : "",
  isLoggedIn: state.user.token !== null,
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
