import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import { MemberRow } from './MemberRow';
import { DEACTIVATE_USER } from './Members';

const membership = {
  id: '1',
  role: 'member',
  user: {
    id: '1',
    name: 'max',
    email: 'max@example.com',
  },
};

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: DEACTIVATE_USER,
      variables: { id: '1' },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deleteTeamMember: {
            teamMemberId: '1',
          },
        },
      };
    },
  },
];

describe('<MemberRow />', () => {
  mockLocalstorage('5');
  let wrapper: ReactWrapper;
  const refetch = jest.fn();

  beforeEach(() => {
    mutationCalled = false;
    wrapper = mount(withMockedProviders(<MemberRow key="1" membership={membership} refetch={refetch} />, mocks));
  });

  it('renders the membership information', () => {
    expect(wrapper.containsMatchingElement(<td>max</td>)).toBe(true);
    expect(wrapper.containsMatchingElement(<td>max@example.com</td>)).toBe(true);
    expect(wrapper.containsMatchingElement(<td>member</td>)).toBe(true);
  });

  it('calls the mutation', async () => {
    await act(async () => {
      findByTestId(wrapper, 'deactivate-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
      expect(refetch).toBeCalledTimes(1);
    });
  });

  it('renders the buttons if the membership is not the current user', () => {
    mockLocalstorage('5');
    wrapper = mount(withMockedProviders(<MemberRow key="1" membership={membership} refetch={refetch} />));

    expect(wrapper.find('.button').length).toBe(3);
  });

  it('does not render the buttons if the membership is the current user', () => {
    mockLocalstorage('1');
    wrapper = mount(withMockedProviders(<MemberRow key="1" membership={membership} refetch={refetch} />));

    expect(wrapper.find('.button').length).toBe(0);
  });
});
