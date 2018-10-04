import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from '../ActionButton';

it('should render self and subcomponents', () => {
  shallow(<ActionButton />);
});
