import { GraphQLError } from "graphql";
import { withMockedProviders } from "../../spec_helper";
import { RegisterPage } from "./index";
import { MUTATION_REGISTER } from "./RegisterPage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_REGISTER,
      variables: {
        name: "Max",
        email: "max@example.com",
        password: "password",
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          signUpUser: {
            authenticateData: {
              token: "1",
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
      query: MUTATION_REGISTER,
      variables: {
        name: "Min",
        email: "min@example.com",
        password: "password",
      },
    },
    result: {
      errors: [new GraphQLError("It broke")],
    },
  },
];

describe("<RegisterPage />", () => {
  beforeEach(() => {
    mutationCalled = false;
    render(withMockedProviders(<RegisterPage />, mocks));
  });

  it("handles input correctly", async () => {
    const nameField = screen.getByLabelText("Name");
    fireEvent.change(nameField, { target: { value: "Max" } });

    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, { target: { value: "max@example.com" } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Register" });
    submitButton.click();

    await waitFor(() => expect(mutationCalled).toBe(true));
  });

  it("shows a message if the name is empty", () => {
    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, { target: { value: "max@example.com" } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Register" });
    submitButton.click();

    const header = screen.getByRole("heading", { name: "Unable to register" });
    expect(header).toBeInTheDocument();
    const message = screen.getByText("You need to fill all fields.");
    expect(message).toBeInTheDocument();
  });

  it("shows a message if the email is empty", () => {
    const nameField = screen.getByLabelText("Name");
    fireEvent.change(nameField, { target: { value: "Max" } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Register" });
    submitButton.click();

    const header = screen.getByRole("heading", { name: "Unable to register" });
    expect(header).toBeInTheDocument();
    const message = screen.getByText("You need to fill all fields.");
    expect(message).toBeInTheDocument();
  });

  it("shows a message if the email is invalid", () => {
    const nameField = screen.getByLabelText("Name");
    fireEvent.change(nameField, { target: { value: "Max" } });

    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, { target: { value: "invalidEmail" } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Register" });
    submitButton.click();

    const header = screen.getByRole("heading", { name: "Unable to register" });
    expect(header).toBeInTheDocument();
    const message = screen.getByText("Invalid email.");
    expect(message).toBeInTheDocument();
  });

  it("shows a message if the password is too short", () => {
    const nameField = screen.getByLabelText("Name");
    fireEvent.change(nameField, { target: { value: "Max" } });

    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, { target: { value: "max@example.com" } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "pass" } });

    const submitButton = screen.getByRole("button", { name: "Register" });
    submitButton.click();

    const header = screen.getByRole("heading", { name: "Unable to register" });
    expect(header).toBeInTheDocument();
    const message = screen.getByText(
      "Password needs to have a minimum of 8 characters.",
    );
    expect(message).toBeInTheDocument();
  });

  it("shows when there is an error", async () => {
    const nameField = screen.getByLabelText("Name");
    fireEvent.change(nameField, { target: { value: "Min" } });

    const emailField = screen.getByLabelText("Email");
    fireEvent.change(emailField, { target: { value: "min@example.com" } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Register" });
    submitButton.click();
    const header = await screen.findByRole("heading", {
      name: "Unable to register",
    });
    expect(header).toBeInTheDocument();
    const message = screen.getByText("It broke");
    expect(message).toBeInTheDocument();
  });
});
