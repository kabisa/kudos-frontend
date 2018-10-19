import { h } from "preact";
import { Container, Menu, Icon, Image, Dropdown } from "semantic-ui-react";
import { connect } from "preact-redux";
import PropTypes from "prop-types";

import { logout } from "../../modules/user/actions";
import { PATH_FEED, PATH_USER } from "../../routes";

import s from "./Desktop.scss";

export const DesktopNavigation = ({ url, name, logout: _logout }) => (
  <div className={s.root}>
    <Menu fixed="top" inverted size="large" className={s.menu}>
      <Container>
        <a href={`#${PATH_FEED}`} className="item">
          Home
        </a>
        <Menu.Item position="right">
          <a href={PATH_USER}>
            <Image src={url} size="mini" circular />
          </a>
        </Menu.Item>
        <Dropdown item simple text={name}>
          <Dropdown.Menu>
            <a
              href={`#${PATH_USER}`}
              className="item"
              style={{ color: "black" }}
            >
              Profile
            </a>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => _logout()}>
              <Icon name="log out" />
              Log out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  </div>
);

DesktopNavigation.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

DesktopNavigation.defaultProps = {
  url: "",
  name: "",
};

const mapStateToProps = state => ({
  url: state.user.data ? state.user.data.avatar_url : null,
  name: state.user.data
    ? `${state.user.data.first_name} ${state.user.data.last_name}`
    : null,
});

const mapDispatchToProps = {
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopNavigation);
