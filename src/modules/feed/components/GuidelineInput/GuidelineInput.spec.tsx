import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId,
  mockLocalstorage, simulateInputChange, wait, withMockedProviders,
} from '../../../../spec_helper';
import GuidelineInput, { GET_GUIDELINES } from './GuidelineInput';

let queryCalled = false;
const mocks = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: '1' },
    },
    result: () => {
      queryCalled = true;
      return {
        data: {
          teamById: {
            guidelines: [
              {
                id: '1',
                kudos: '10',
                name: 'Op tijd bij meeting',
              },
              {
                id: '2',
                kudos: '15',
                name: 'Bureau opgeruimd',
              },
            ],
          },
        },
      };
    },
  },
];
const mocksWithError = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: '1' },
    },
    error: new Error('It broke'),
  },
];
const mocksWithoutData = [
  {
    request: {
      query: GET_GUIDELINES,
      variables: { team_id: '1' },
    },
    result: () => {
      queryCalled = true;
      return {
        data: {
          teamById: {
            guidelines: [],
          },
        },
      };
    },
  },
];

describe('<GuidelineInput />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;
  const handleChangeMock = jest.fn();

  beforeEach(() => {
    queryCalled = false;
    wrapper = mount(withMockedProviders(<GuidelineInput
      handleChange={handleChangeMock}
      amountError={false}
    />, mocks));
  });

  it('handles state change correctly', async () => {
    const component: any = wrapper.find('GuidelineInput').instance();

    await act(async () => {
      expect(component.state.amount).toBe('');

      simulateInputChange(wrapper, 'amount-input', 'amount', '5');
      await wrapper.update();

      expect(component.state.amount).toBe('5');
    });
  });

  it('sets the focus on focus event', async () => {
    const component: any = wrapper.find('GuidelineInput').instance();

    await act(async () => {
      expect(component.state.inputFocus).toBe(false);

      // @ts-ignore
      findByTestId(wrapper, 'amount-input').find('input').prop('onFocus')();

      await wrapper.update();

      expect(component.state.inputFocus).toBe(true);
    });
  });

  it('resets the the focus on blur', async () => {
    const component: any = wrapper.find('GuidelineInput').instance();

    await act(async () => {
      component.setState({ inputFocus: true });

      // @ts-ignore
      findByTestId(wrapper, 'amount-input').find('input').prop('onBlur')();

      await wrapper.update();

      expect(component.state.inputFocus).toBe(false);
    });
  });

  it('calls the mutation is the input is focused and amount is not empty', async () => {
    const component = wrapper.find('GuidelineInput').instance();

    await act(async () => {
      component.setState({ amount: '5', inputFocus: false });
      await wrapper.update();

      expect(queryCalled).toBe(false);

      component.setState({ amount: '5', inputFocus: true });

      await wait(0);
      await wrapper.update();

      expect(queryCalled).toBe(true);
    });
  });

  it('Shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<GuidelineInput
      handleChange={handleChangeMock}
      amountError={false}
    />, mocksWithError));

    const component = wrapper.find('GuidelineInput').instance();
    await act(async () => {
      component.setState({ amount: '10', inputFocus: true });

      await wrapper.update();

      await wait(0);
      await wrapper.update();

      expect(wrapper.contains('Network error: It broke')).toBe(true);
    });
  });

  it('Shows a message when there are no guidelines', async () => {
    wrapper = mount(withMockedProviders(<GuidelineInput
      handleChange={handleChangeMock}
      amountError={false}
    />, mocksWithoutData));

    const component = wrapper.find('GuidelineInput').instance();
    await act(async () => {
      component.setState({ amount: '10', inputFocus: true });

      await wrapper.update();

      await wait(0);
      await wrapper.update();

      expect(queryCalled).toBe(true);
      expect(wrapper.contains('No guidelines available')).toBe(true);
    });
  });

  it('Shows when the query is loading', async () => {
    const component = wrapper.find('GuidelineInput').instance();
    await act(async () => {
      component.setState({ amount: '10', inputFocus: true });

      // Update the state twice to first set the new variables and then fire the query
      await wrapper.update();
      await wrapper.update();

      expect(wrapper.contains('Loading...')).toBe(true);
    });
  });

  it('renders a segment for each guideline', async () => {
    const component = wrapper.find('GuidelineInput').instance();
    await act(async () => {
      component.setState({ amount: '10', inputFocus: true });

      await wrapper.update();

      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'guideline-row').length).toBe(2);
    });
  });

  it('should set the correct amount when a guideline is clicked', async () => {
    const component: any = wrapper.find('GuidelineInput').instance();
    await act(async () => {
      component.setState({ amount: '14', inputFocus: true });

      await wrapper.update();

      await wait(0);
      await wrapper.update();

      const row = findByTestId(wrapper, 'guideline-row').at(0).find('div');
      row.simulate('click');

      await wrapper.update();

      expect(component.state.inputFocus).toBe(false);
      expect(component.state.amount).toBe('15');
    });
  });
});
