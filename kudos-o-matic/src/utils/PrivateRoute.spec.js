import React from 'react';
import { shallow } from 'enzyme';
import { PrivateRoute } from './PrivateRoute';

it('should render self and subcomponents', () => {
  shallow(<PrivateRoute component={() => <h1>test</h1>} />);
});
