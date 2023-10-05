import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { GraphQLError } from "graphql";
import { LoginPage } from "./index";
import {
  findByTestId,
  simulateInputChange,
  wait,
  withMockedProviders,
} from "../../spec_helper";
import { MUTATION_LOGIN } from "./LoginPage";

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_LOGIN,
      variables: {
        email: "max@example.com",
        password: "password",
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          signInUser: {
            authenticateData: {
              token: "fakeToken",
              user: {
                id: "1",
              },
            },
          },
        },
      };
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: MUTATION_LOGIN,
      variables: {
        email: "max@example.com",
        password: "password",
      },
    },
    result: {
      errors: [new GraphQLError("It broke")],
    },
  },
];

describe.skip("<LoginPage />", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mutationCalled = false;
    wrapper = mount(withMockedProviders(<LoginPage />, mocks));
  });

  it("has a password forgot button", () => {
    expect(findByTestId(wrapper, "forgot-button").hostNodes().length).toBe(1);
  });

  it("has a register button", () => {
    expect(findByTestId(wrapper, "sign-up-button").hostNodes().length).toBe(1);
  });

  it("handles input correctly", async () => {
    const component: any = wrapper.find("LoginPage").instance();

    await act(async () => {
      expect(component.state.email).toBe("");
      expect(component.state.password).toBe("");

      simulateInputChange(wrapper, "email-input", "email", "max@example.com");
      simulateInputChange(wrapper, "password-input", "password", "password");

      await wrapper.update();

      expect(component.state.email).toBe("max@example.com");
      expect(component.state.password).toBe("password");
    });
  });

  it("shows a message if the email is empty", async () => {
    const component: any = wrapper.find("LoginPage").instance();

    await act(async () => {
      component.setState({ email: "" });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");

      await wrapper.update();

      expect(component.state.error).toBe("You need to fill all fields.");
      expect(
        wrapper.containsMatchingElement(<p>You need to fill all fields.</p>),
      ).toBe(true);
    });
  });

  it("shows a message if the password is empty", async () => {
    const component: any = wrapper.find("LoginPage").instance();

    await act(async () => {
      component.setState({ email: "max@example.com", password: "" });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");

      await wrapper.update();

      expect(component.state.error).toBe("You need to fill all fields.");
      expect(
        wrapper.containsMatchingElement(<p>You need to fill all fields.</p>),
      ).toBe(true);
    });
  });

  it("shows when there is an error message", async () => {
    wrapper = mount(withMockedProviders(<LoginPage />, mocksWithError));
    const component = wrapper.find("LoginPage").instance();
    await act(async () => {
      component.setState({ email: "max@example.com", password: "password" });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");

      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, "error-message").text()).toBe("It broke");
    });
  });

  it("shows a message if the email is invalid", async () => {
    const component: any = wrapper.find("LoginPage").instance();

    await act(async () => {
      component.setState({ email: "invalidEmail", password: "password" });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");

      await wrapper.update();

      expect(component.state.error).toBe("Invalid email.");
      expect(wrapper.containsMatchingElement(<p>Invalid email.</p>)).toBe(true);
    });
  });

  it("calls the mutation", async () => {
    const component = wrapper.find("LoginPage").instance();
    await act(async () => {
      component.setState({ email: "max@example.com", password: "password" });
      await wrapper.update();

      findByTestId(wrapper, "submit-button").hostNodes().simulate("submit");

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });
});
