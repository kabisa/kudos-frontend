import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Navigation } from '../../navigation';
import { logout } from '../actions';

import '../../../app.css';

export class UserPage extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { avatarUrl, name, location } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <div className="page flex">
          <div>
            <Image src={avatarUrl} circular style={{ margin: 'auto', paddingTop: '2rem' }} />
            <h2 style={{ marginBottom: 0 }}>{name}</h2>
            <span style={{ color: 'grey' }}>{location}</span>
          </div>
          <Button color="red" onClick={this.logout} style={{ margin: 'auto', display: 'block' }}>
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
  location: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  avatarUrl: state.user.data ? state.user.data.avatar_url : '',
  location: state.user.data ? state.user.data.location : '',
  name: state.user.data ? `${state.user.data.first_name} ${state.user.data.last_name}` : ''
});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
