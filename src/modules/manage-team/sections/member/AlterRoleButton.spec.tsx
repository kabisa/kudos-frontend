import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { mockLocalstorage, wait, withMockedProviders } from '../../../../spec_helper';
import { AlterRoleButton, AlterRoleButtonMode } from './AlterRoleButton';
import { ALTER_ROLE } from './Members';

const adminMembership = {
  id: '1',
  role: 'admin',
  user: {
    id: '1',
    name: 'Max',
    email: 'max@example.com',
  },
};

const normalMembership = {
  id: '1',
  role: 'member',
  user: {
    id: '1',
    name: 'Max',
    email: 'max@example.com',
  },
};
let mutationCalled = false;
const mocks = [
  {
    request: {
      query: ALTER_ROLE,
      variables: {
        role: 'moderator',
        userId: '1',
        teamId: '1',
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          updateTeamMemberRole: {
            teamMember: {
              role: 'moderator',
              id: '1',
            },
            errors: [],
          },
        },
      };
    },
  },
];

const refetch = jest.fn();

function setup(membership: any, mode: AlterRoleButtonMode) {
  return mount(withMockedProviders(<AlterRoleButton
    refetch={refetch}
    membership={membership}
    mode={mode}
  />, mocks));
}

describe('<AlterRoleButton />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mutationCalled = false;
  });

  it('renders the promote button correctly', () => {
    wrapper = setup(adminMembership, AlterRoleButtonMode.PROMOTE);

    expect(wrapper.find('.button').hasClass('green')).toBe(true);
    expect(wrapper.find('i').hasClass('arrow up')).toBe(true);
  });

  it('renders the demote button correctly', () => {
    wrapper = setup(adminMembership, AlterRoleButtonMode.DEMOTE);

    expect(wrapper.find('.button').hasClass('yellow')).toBe(true);
    expect(wrapper.find('i').hasClass('arrow down')).toBe(true);
  });

  it('disables the promote button when the user is an admin', () => {
    wrapper = setup(adminMembership, AlterRoleButtonMode.PROMOTE);

    expect(wrapper.find('.button').hasClass('disabled')).toBe(true);
  });

  it('disables the demote button when the user is a member', () => {
    wrapper = setup(normalMembership, AlterRoleButtonMode.DEMOTE);

    expect(wrapper.find('.button').hasClass('disabled')).toBe(true);
  });

  it('calls the mutation', async () => {
    wrapper = setup(normalMembership, AlterRoleButtonMode.PROMOTE);
    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
      expect(refetch).toBeCalledTimes(1);
    });
  });
});
