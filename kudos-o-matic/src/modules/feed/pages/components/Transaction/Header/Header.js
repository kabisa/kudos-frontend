/* eslint react/jsx-one-expression-per-line: off */
import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment-twitter';

import { UserProp } from '../../../../../../proptypes';

const Header = ({ authorUrl, createdOn, kudos, receivers }) => {
  const timestamp = moment(createdOn);

  const receiversList = receivers.map(user => <Image key={user.id} src={user.avatar_url} avatar />);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '45px' }}>
        <span>{kudos} ₭</span>
      </div>
      <div style={{ marginLeft: '12px', display: 'flex', flexFlow: 'wrap', maxWidth: '12em' }}>
        <Image src={authorUrl} avatar />
        {receiversList}
      </div>
      <span
        style={{
          fontWeight: '300',
          fontSize: '12px',
          marginLeft: 'auto',
          width: '65px',
          textAlign: 'right'
        }}
      >
        {timestamp.twitter()} ago
      </span>
    </div>
  );
};

Header.propTypes = {
  authorUrl: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  kudos: PropTypes.number.isRequired,
  receivers: PropTypes.arrayOf(UserProp).isRequired
};

export default Header;
