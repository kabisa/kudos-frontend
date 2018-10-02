import React from 'react';
import { Button, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { PATH_ADD_TRANSACTION } from '../../../../../routes';

import './ActionButton.css';

export default () => (
  <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
    <Link to={PATH_ADD_TRANSACTION}>
      <Button circular icon="plus" className="add-button" primary size="huge" />
    </Link>
  </Responsive>
);
