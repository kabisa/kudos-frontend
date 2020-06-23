import React from 'react';
import { Responsive } from 'semantic-ui-react';
import MobileNavigation from './Mobile';
import Desktop from './Desktop';

export default () => (
  <div>
    <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
      <MobileNavigation />
    </Responsive>
    <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
      <Desktop />
    </Responsive>
  </div>
);
