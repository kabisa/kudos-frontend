import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

const Toolbar = ({ backLink, text }) => (
  <div className="top-navigation">
    <Link to={backLink} style={{ width: '70px', height: '100%', display: 'flex', color: 'black' }}>
      <Icon name="arrow left" size="large" style={{ margin: 'auto' }} />
    </Link>
    <span style={{ lineHeight: '55px' }}>{text}</span>
  </div>
);

Toolbar.propTypes = {
  backLink: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Toolbar;
