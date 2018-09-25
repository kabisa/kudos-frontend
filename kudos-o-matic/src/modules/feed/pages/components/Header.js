import React from 'react';
/* eslint react/jsx-one-expression-per-line: off */
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment-twitter';

const Header = ({ url, name, createdOn }) => {
  const timestamp = moment(createdOn);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Image src={url} avatar />
      <span style={{ marginLeft: '4px' }}>{name}</span>
      <span style={{ fontWeight: '300', fontSize: '12px', marginLeft: 'auto' }}>
        {timestamp.twitter()} ago
      </span>
    </div>
  );
};

Header.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired
};

export default Header;
