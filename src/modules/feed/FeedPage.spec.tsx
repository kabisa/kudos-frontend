import { mount, ReactWrapper } from 'enzyme';
import { Context as ResponsiveContext } from 'react-responsive'
import { act } from 'react-dom/test-utils';
import {
  findByTestId,
  mockLocalstorage, withMockedProviders,
} from '../../spec_helper';
import { FeedPage } from './index';

let wrapper: ReactWrapper;

const setup = () => {
  wrapper = mount(withMockedProviders(
    // Because the component is wrapped with react-responsive components we need
    // to provide a mock value for the browser width.
    <ResponsiveContext.Provider value={{ width: 1200 }}>
      <FeedPage />
    </ResponsiveContext.Provider>
  ));
};

describe('<FeedPage />', () => {
  beforeEach(async () => {
    mockLocalstorage('1');

    await act(async () => {
      setup();
    });
  });

  it('should show a create post section', async () => {
    expect(wrapper.find('CreatePost').length).toBe(1);
  });

  it('should show a right rail', async () => {
    expect(findByTestId(wrapper, 'right-tail').length).toBe(1);
  });

  it('should show a repo list', async () => {
    expect(findByTestId(wrapper, 'repo-list').length).toBe(1);
  });
});
