import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { PATH_FEED } from '../../../../routes';

export default () => (
  <div style={{ width: '290px', margin: 'auto' }}>
    <h2 style={{ display: 'inline' }}>Kabisa</h2>
    <Link to={PATH_FEED}>
      <Button color="green" style={{ float: 'right' }}>
        Join
      </Button>
    </Link>
  </div>
);
