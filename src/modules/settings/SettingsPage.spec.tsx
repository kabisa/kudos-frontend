import React from 'react';
import { mount } from 'enzyme';
import { mockLocalstorage, withMockedProviders } from '../../spec_helper';
import { SettingsPage } from './index';

describe('<SettingsPage />', () => {
  it('shows the invite button if the user is an admin', () => {
    mockLocalstorage('admin');
    const wrapper = mount(withMockedProviders(<SettingsPage />));
    expect(wrapper.containsMatchingElement(<button>Invite</button>)).toBe(true);
  });

  it('hides the invite button if the user is an admin', () => {
    mockLocalstorage('member');
    const wrapper = mount(withMockedProviders(<SettingsPage />));
    expect(wrapper.containsMatchingElement(<button>Invite</button>)).toBe(false);
  });
});
