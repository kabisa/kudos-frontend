import React from 'react';
import { shallow } from 'enzyme';

import { SettingsPage } from './SettingsPage';

it('should render self and subcomponents', () => {
  shallow(<SettingsPage />);
});
