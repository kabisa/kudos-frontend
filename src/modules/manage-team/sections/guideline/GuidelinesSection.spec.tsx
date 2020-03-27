import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import GuidelineSection, { GET_GUIDELINES } from './GuidelinesSection';

const mocks = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          guidelines: [
            {
              id: '1',
              kudos: 5,
              name: 'first guideline',
            },
            {
              id: '2',
              kudos: 10,
              name: 'second guideline',
            },
          ],
        },
      },
    },
  },
];

const noDataMocks = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: '1' },
    },
    result: {
      data: {
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: '1' },
    },
    error: new Error('it went wrong'),
  },
];


describe('<GuidelinesSection />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<GuidelineSection />, mocks));
  });

  it('shows a loading state', () => {
    expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBe(true);
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<GuidelineSection />, errorMocks));

    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Error! Network error: it went wrong</p>)).toBe(true);
    });
  });

  it('shows when there are no guidelines', async () => {
    wrapper = mount(withMockedProviders(<GuidelineSection />, noDataMocks));

    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>No guidelines available</p>)).toBe(true);
    });
  });


  it('shows a row for each guideline ', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      const rows = findByTestId(wrapper, 'guideline-row');

      expect(rows.length).toBe(2);
    });
  });
});
