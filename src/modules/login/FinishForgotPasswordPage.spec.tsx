import { GraphQLError } from "graphql";
import { withMockedProviders } from "../../spec_helper";
import { MUTATION_NEW_PASSWORD } from "./FinishForgotPasswordPage";
import { RouterBypassFinishForgotPasswordPage as FinishForgotPasswordPage } from "./index";
import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createBrowserHistory } from "history";

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_NEW_PASSWORD,
      variables: {
        reset_password_token: "19810531",
        password: "L0r3m1psum!",
        password_confirmation: "L0r3m1psum!",
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          newPassword: {
            user: {
              id: "1",
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
      query: MUTATION_NEW_PASSWORD,
      variables: {
        reset_password_token: "90210",
        password: "password",
        password_confirmation: "password",
      },
    },
    result: {
      errors: [new GraphQLError("It broke")],
    },
  },
];

describe("<FinishForgotPasswordPage />", () => {
  const createPropsWithToken = (token: string) => ({
    location: {
      search: `reset_password_token=${token}`,
      pathname: "",
      state: "",
      hash: "",
    },
    history: createBrowserHistory(),
    match: {
      params: "",
      isExact: false,
      path: "",
      url: "",
    },
  });

  let renderResult: RenderResult;

  beforeEach(() => {
    const props = createPropsWithToken("19810531");

    mutationCalled = false;
    renderResult = render(
      withMockedProviders(<FinishForgotPasswordPage {...props} />, mocks),
    );
  });

  it("Displays a reset password header", () => {
    screen.getByRole("heading", { name: "Reset password" });
  });

  it("handles input correctly", async () => {
    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "L0r3m1psum!" } });

    const passwordConfirmField = screen.getByLabelText("Confirm password");
    fireEvent.change(passwordConfirmField, {
      target: { value: "L0r3m1psum!" },
    });

    const submitButton = screen.getByRole("button");
    submitButton.click();
    waitFor(() => {
      expect(mutationCalled).toBe(true);
    });
  });

  it("shows a message if the password field is empty", async () => {
    const submitButton = screen.getByRole("button");
    submitButton.click();

    const heading = screen.getByRole("heading", {
      name: "Unable to reset password",
    });
    expect(heading).toBeInTheDocument();
    const message = screen.getByText("Fields can't be empty.");
    expect(message).toBeInTheDocument();
  });

  it("shows a message if the confirm password field is empty", async () => {
    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "L0r3m1psum!" } });

    const submitButton = screen.getByRole("button");
    submitButton.click();

    const heading = screen.getByRole("heading", {
      name: "Unable to reset password",
    });
    expect(heading).toBeInTheDocument();

    const message = screen.getByText("Fields can't be empty.");
    expect(message).toBeInTheDocument();
  });

  it("shows a message if the passwords are not the same", async () => {
    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "L0r3m1psum!" } });

    const passwordConfirmField = screen.getByLabelText("Confirm password");
    fireEvent.change(passwordConfirmField, {
      target: { value: "Some other value" },
    });

    const submitButton = screen.getByRole("button");
    submitButton.click();

    const heading = screen.getByRole("heading", {
      name: "Unable to reset password",
    });
    expect(heading).toBeInTheDocument();

    const message = screen.getByText("Passwords don't match.");
    expect(message).toBeInTheDocument();
  });

  it("shows when there is an error", async () => {
    renderResult.unmount();

    const props = createPropsWithToken("90210");
    render(
      withMockedProviders(
        <FinishForgotPasswordPage {...props} />,
        mocksWithError,
      ),
    );

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const passwordConfirmField = screen.getByLabelText("Confirm password");
    fireEvent.change(passwordConfirmField, {
      target: { value: "password" },
    });

    const submitButton = screen.getByRole("button");
    submitButton.click();
    waitFor(() => {
      expect(mutationCalled).toBe(true);
    });
  });
});
