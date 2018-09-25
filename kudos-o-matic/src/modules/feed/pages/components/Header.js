import React from 'react';
/* eslint react/jsx-one-expression-per-line: off */
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment-twitter';

const Header = ({ url, name, createdOn, kudos }) => {
  const timestamp = moment(createdOn);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Image src={url} avatar />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4px' }}>
        <span>{name}</span>
        <span style={{ fontWeight: '300', fontSize: '12px', lineHeight: 'initial' }}>
          Gave {kudos} kudos
        </span>
      </div>
      <span style={{ fontWeight: '300', fontSize: '12px', marginLeft: 'auto' }}>
        {timestamp.twitter()} ago
      </span>
    </div>
  );
};

Header.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  kudos: PropTypes.number.isRequired
};

export default Header;
