import React from 'react';
import { Button, Responsive } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import { PATH_ADD_TRANSACTION } from '../../../../routes';

export default () => (
  <div>
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <Link to={`${PATH_ADD_TRANSACTION}?transition=slideup`}>
        <Button circular icon="plus" className="add-button" primary size="huge" />
      </Link>
    </Responsive>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Link to={`${PATH_ADD_TRANSACTION}?transition=slideup`}>
        <Button circular icon="plus" className="add-button add-button-desktop" primary size="massive" />
      </Link>
    </Responsive>
  </div>
);
