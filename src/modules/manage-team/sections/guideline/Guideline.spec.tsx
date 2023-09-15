import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import { DELETE_GUIDELINE, Guideline } from './Guideline';
import { GET_GUIDELINES } from './GuidelinesSection';

let mutationCalled = false;
let getGuidelinesCalled = false;
const mocks = [
  {
    request: {
      query: DELETE_GUIDELINE,
      variables: {
        id: 1,
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deleteGuideline: {
            guidelineId: '1',
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_GUIDELINES,
      variables: {
        team_id: '1',
      },
    },
    result: () => {
      getGuidelinesCalled = true;
      return {
        data: {
          teamById: {
            guidelines: [
              {
                id: '1',
                kudos: 10,
                name: 'some guideline',
              },
            ],
          },
        },
      };
    },
  },

];

const guideline = {
  key: 1,
  id: 1,
  name: 'Some guideline',
  kudos: 5,
};

describe('<Guideline />', () => {
  const editGuidelineMock = jest.fn();
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockLocalstorage('1');
    wrapper = mount(withMockedProviders(
      <table>
        <tbody>
          <Guideline
            key={guideline.key}
            name={guideline.name}
            id={guideline.id}
            kudos={guideline.kudos}
            editGuideline={editGuidelineMock}
          />
        </tbody>
      </table>, mocks,
    ));
  });

  it('renders the guideline name', () => {
    expect(wrapper.containsMatchingElement(<td>{guideline.name}</td>)).toBe(true);
  });

  it('renders the guideline amount', () => {
    expect(wrapper.containsMatchingElement(<td>{guideline.kudos}</td>)).toBe(true);
  });

  it('calls the edit guideline function', () => {
    act(() => {
      findByTestId(wrapper, 'edit-button').hostNodes().simulate('click');

      expect(editGuidelineMock).toBeCalledTimes(1);
      expect(editGuidelineMock).toHaveBeenCalledWith(guideline.id, guideline.kudos, guideline.name);
    });
  });

  it('has a confirm button for the delete action', async () => {
    await act(async () => {
      findByTestId(wrapper, 'delete-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'confirm-delete-button').hostNodes().length).toBe(1);
    });
  });

  it('calls the delete mutation', async () => {
    await act(async () => {
      findByTestId(wrapper, 'delete-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      findByTestId(wrapper, 'confirm-delete-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });

  it('refetches the guidelines after the deletion', async () => {
    await act(async () => {
      findByTestId(wrapper, 'delete-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      findByTestId(wrapper, 'confirm-delete-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);

      await wait(0);
      await wrapper.update();

      expect(getGuidelinesCalled).toBe(true);
    });
  });
});
