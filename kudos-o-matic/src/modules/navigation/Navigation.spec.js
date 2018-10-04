import React from 'react';
import { shallow } from 'enzyme';

import Navigation from './Navigation';

it('should render self and subcomponents', () => {
  shallow(<Navigation />);
});
