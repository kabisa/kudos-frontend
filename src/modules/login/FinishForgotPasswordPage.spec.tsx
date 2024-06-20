import { GraphQLError } from "graphql";
import { MUTATION_NEW_PASSWORD } from "./FinishForgotPasswordPage";
import { RouterBypassFinishForgotPasswordPage as FinishForgotPasswordPage } from "./index";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { createBrowserHistory } from "history";
import { makeFC, setComponent } from "../../support/testing/testComponent";
import { applicationContext } from "../../support/testing/testContexts";

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
  const { setProps, renderComponent, updateProps } = setComponent(
    makeFC(FinishForgotPasswordPage),
    applicationContext(mocks),
  );

  const createLocationWithToken = (token: string) => ({
    search: `reset_password_token=${token}`,
    pathname: "",
    state: "",
    hash: "",
  });

  setProps({
    location: createLocationWithToken("19810531"),
    history: createBrowserHistory(),
    match: {
      params: "",
      isExact: false,
      path: "",
      url: "",
    },
  });

  beforeEach(() => {
    mutationCalled = false;
    renderComponent();
  });

  it("Displays a reset password header", () => {
    screen.getByRole("heading", { name: "Reset password" });
  });

  it("handles input correctly", () => {
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

  it("shows a message if the password field is empty", () => {
    const submitButton = screen.getByRole("button");
    submitButton.click();

    const heading = screen.getByRole("heading", {
      name: "Unable to reset password",
    });
    expect(heading).toBeInTheDocument();
    const message = screen.getByText("Fields can't be empty.");
    expect(message).toBeInTheDocument();
  });

  it("shows a message if the confirm password field is empty", () => {
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

  it("shows a message if the passwords are not the same", () => {
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

  it("shows when there is an error", () => {
    updateProps({ location: createLocationWithToken("90210") });
    renderComponent();

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
