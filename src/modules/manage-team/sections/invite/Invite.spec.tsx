import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import {
  findByTestId,
  mockLocalstorage,
  wait,
  withMockedProviders,
} from "../../../../spec_helper";
import { Invite, MUTATION_DELETE_INVITE } from "./Invite";
import { InviteModel, QUERY_GET_INVITES } from "./InvitesSection";

const pendingInvite: InviteModel = {
  acceptedAt: "",
  declinedAt: "",
  email: "pending@example.com",
  id: 1,
  sentAt: "2020-03-10",
};

const acceptedInvite: InviteModel = {
  acceptedAt: "2020-03-15",
  declinedAt: "",
  email: "accepted@example.com",
  id: 2,
  sentAt: "2020-03-10",
};

const declinedInvite: InviteModel = {
  acceptedAt: "",
  declinedAt: "2020-03-15",
  email: "declined@example.com",
  id: 3,
  sentAt: "2020-03-10",
};

let mutationCalled = false;
let queryCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_DELETE_INVITE,
      variables: { id: 1 },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deleteTeamInvite: {
            teamInviteId: "1",
          },
        },
      };
    },
  },
  {
    request: {
      query: QUERY_GET_INVITES,
      variables: { team_id: "1" },
    },
    result: () => {
      queryCalled = true;
      return {
        data: {
          teamById: {
            teamInvites: [
              {
                acceptedAt: "",
                declinedAt: "",
                email: "max@example.com",
                id: "1",
                sentAt: "2020-03-01",
              },
            ],
          },
        },
      };
    },
  },
];

describe.skip("<Invite />", () => {
  let wrapper: ReactWrapper;

  function setup(invite: InviteModel) {
    const mockRefetch = jest.fn();

    wrapper = mount(
      withMockedProviders(
        <table>
          <tbody>
            <Invite invite={invite} key={1} refetch={mockRefetch} />
          </tbody>
        </table>,
        mocks,
      ),
    );
  }

  beforeEach(() => {
    mockLocalstorage("1");
    mutationCalled = false;
    queryCalled = false;
    setup(pendingInvite);
  });

  it("shows the invite send date and email", () => {
    expect(wrapper.containsMatchingElement(<td>2020-03-10</td>)).toBe(true);
    expect(wrapper.containsMatchingElement(<td>pending@example.com</td>)).toBe(
      true,
    );
  });

  it("shows that the invite is pending", () => {
    expect(wrapper.containsMatchingElement(<td>Pending</td>)).toBe(true);
  });

  it("shows that the invite is accepted", () => {
    setup(acceptedInvite);

    expect(wrapper.containsMatchingElement(<td>Accepted</td>)).toBe(true);
  });

  it("shows that the invite is declined", () => {
    setup(declinedInvite);

    expect(wrapper.containsMatchingElement(<td>Declined</td>)).toBe(true);
  });

  it("has a confirm delete button", async () => {
    await act(async () => {
      findByTestId(wrapper, "delete-button").hostNodes().simulate("click");

      await wait(0);
      await wrapper.update();

      expect(
        findByTestId(wrapper, "confirm-delete-button").hostNodes().length,
      ).toBe(1);
    });
  });

  it("calls the delete mutation", async () => {
    await act(async () => {
      findByTestId(wrapper, "delete-button").hostNodes().simulate("click");

      await wait(0);
      await wrapper.update();

      findByTestId(wrapper, "confirm-delete-button")
        .hostNodes()
        .simulate("click");

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);

      await wait(0);
      await wrapper.update();

      expect(queryCalled).toBe(true);
    });
  });
});
