import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { wait, withMockedProviders } from '../../../spec_helper';
import LeftRail, { GET_INFO } from './LeftRail';

const mocks = [
  {
    request: {
      query: GET_INFO,
    },
    result: {
      data: {
        viewer: {
          name: 'Max',
          email: 'max@example.com',
        },
      },
    },
  },
];
const mocksWithError = [
  {
    request: {
      query: GET_INFO,
    },
    error: new Error('It broke'),
  },
];
const mocksWithoutData = [
  {
    request: {
      query: GET_INFO,
    },
    result: {
      data: {},
    },
  },
];

let wrapper: ReactWrapper;
const setup = (mock: any) => {
  wrapper = mount(withMockedProviders(<LeftRail />, mock));
};

describe('<LeftRail />', () => {
  beforeEach(() => {
    setup(mocks);
  });

  it('renders the users name', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<h3>Hello Max</h3>)).toBe(true);
    });
  });

  it('shows a loading state', async () => {
    await act(async () => {
      expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBe(true);
    });
  });

  it('should show when there is an error', async () => {
    setup(mocksWithError);
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Error! Network error: It broke</p>)).toBe(true);
    });
  });

  it('should show when there is no data', async () => {
    setup(mocksWithoutData);
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<h3>Hello -</h3>)).toBe(true);
    });
  });
});
