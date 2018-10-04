import React from 'react';
import { shallow } from 'enzyme';

import { NotificationsPage } from './NotificationsPage';

it('should render self and subcomponents', () => {
  shallow(<NotificationsPage />);
});
