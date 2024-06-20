import { GraphQLError } from "graphql";
import { LoginPage } from "./index";
import { MUTATION_LOGIN } from "./LoginPage";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { makeFC, setComponent } from "../../support/testing/testComponent";
import {
  applicationContext,
  routingContext,
} from "../../support/testing/testContexts";

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
  {
    request: {
      query: MUTATION_LOGIN,
      variables: {
        email: "min@example.com",
        password: "password",
      },
    },
    result: {
      errors: [new GraphQLError("It broke")],
    },
  },
];

describe("<LoginPage />", () => {
  const { setProps, renderComponent } = setComponent(
    makeFC(LoginPage),
    applicationContext(mocks),
    routingContext(),
  );
  setProps({});

  beforeEach(() => {
    mutationCalled = false;
    renderComponent();
  });

  it("has a forgot password button", () => {
    const forgotPassword = screen.getByRole("link", {
      name: "Forgot password?",
    });
    expect(forgotPassword).toBeInTheDocument();
  });

  it("has a register button", () => {
    const signUp = screen.getByRole("link", {
      name: "Sign Up",
    });
    expect(signUp).toBeInTheDocument();
  });

  it("handles input correctly", async () => {
    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, { target: { value: "max@example.com" } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Login" });
    submitButton.click();

    await waitFor(() => expect(mutationCalled).toBe(true));
  });

  it("shows a message if the email is empty", () => {
    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Login" });
    submitButton.click();

    const header = screen.getByRole("heading", { name: "Unable to login" });
    expect(header).toBeInTheDocument();

    const message = screen.getByText("You need to fill all fields.");
    expect(message).toBeInTheDocument();
  });

  it("shows a message if the password is empty", () => {
    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, { target: { value: "max@example.com" } });

    const submitButton = screen.getByRole("button", { name: "Login" });
    submitButton.click();

    const header = screen.getByRole("heading", { name: "Unable to login" });
    expect(header).toBeInTheDocument();

    const message = screen.getByText("You need to fill all fields.");
    expect(message).toBeInTheDocument();
  });

  it("shows when there is an error message", async () => {
    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, { target: { value: "min@example.com" } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Login" });
    submitButton.click();

    const header = await screen.findByRole("heading", {
      name: "Unable to login",
    });
    expect(header).toBeInTheDocument();

    const message = screen.getByText("It broke");
    expect(message).toBeInTheDocument();
  });

  it("shows a message if the email is invalid", async () => {
    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, { target: { value: "invalidEmail" } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Login" });
    submitButton.click();

    const header = await screen.findByRole("heading", {
      name: "Unable to login",
    });
    expect(header).toBeInTheDocument();

    const message = screen.getByText("Invalid email.");
    expect(message).toBeInTheDocument();
  });
});
