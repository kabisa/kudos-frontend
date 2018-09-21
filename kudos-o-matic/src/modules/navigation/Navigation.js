import React from 'react';
import { Responsive } from 'semantic-ui-react';
import MobileNavigation from './Mobile';
import DesktopNavigation from './Desktop';

export default () => (
  <div>
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <MobileNavigation />
    </Responsive>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <DesktopNavigation />
    </Responsive>
  </div>
);
