import React from 'react';
import { Container, Menu, Icon, Image, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../user';

import { PATH_FEED, PATH_USER } from '../../routes';

export const DesktopNavigation = ({ url, name, logout: _logout }) => (
  <div style={{ position: 'fixed', top: 0, width: '100%' }}>
    <Menu fixed="top" inverted size="large" style={{ height: '62.84px' }}>
      <Container>
        <NavLink to={PATH_FEED} className="item">
          Home
        </NavLink>
        <Menu.Item position="right">
          <Image src={url} size="mini" circular />
        </Menu.Item>
        <Dropdown item simple text={name}>
          <Dropdown.Menu>
            <Link to={PATH_USER} className="item" style={{ color: 'black' }}>
              Profile
            </Link>
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
  logout: PropTypes.func.isRequired
};

DesktopNavigation.defaultProps = {
  url: '',
  name: ''
};

const mapStateToProps = state => ({
  url: state.user.data ? state.user.data.avatar_url : null,
  name: state.user.data ? `${state.user.data.first_name} ${state.user.data.last_name}` : null
});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopNavigation);
