import { GraphQLError } from "graphql";
import { ForgotPasswordPage } from "./index";
import { MUTATION_FORGOT_PASSWORD } from "./ForgotPasswordPage";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { makeFC, setComponent } from "../../support/testing/testComponent";
import { applicationContext } from "../../support/testing/testContexts";

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_FORGOT_PASSWORD,
      variables: {
        email: "max@example.com",
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          forgotPassword: {
            email: "max@example.com",
          },
        },
      };
    },
  },
  {
    request: {
      query: MUTATION_FORGOT_PASSWORD,
      variables: {
        email: "broken@example.com",
      },
    },
    result: {
      errors: [new GraphQLError("It broke")],
    },
  },
];

describe("<ForgotPasswordPage />", () => {
  const { setProps, renderComponent } = setComponent(
    makeFC(ForgotPasswordPage),
    applicationContext(mocks),
  );
  setProps({});

  beforeEach(() => {
    mutationCalled = false;
    renderComponent();
  });

  it("displays a header for the page", () => {
    const header = screen.getByRole("heading", { name: "Forgot password" });
    expect(header).toBeInTheDocument();
  });

  it("handles input correctly", async () => {
    const inputField = screen.getByPlaceholderText("E-mail address");
    fireEvent.change(inputField, {
      target: { value: "max@example.com" },
    });

    const submit = screen.getByRole("button", { name: "Reset password" });
    submit.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
    });

    const result = await screen.findByText("Reset password instructions sent");
    expect(result).toBeInTheDocument();
  });

  it("shows a message if the email in invalid", async () => {
    const inputField = screen.getByPlaceholderText("E-mail address");
    fireEvent.change(inputField, {
      target: { value: "invalidEmail" },
    });

    const submit = screen.getByRole("button", { name: "Reset password" });
    submit.click();

    const header = await screen.findByRole("heading", {
      name: "Unable to reset the password",
    });
    expect(header).toBeInTheDocument();

    const result = await screen.findByText("Invalid email address");
    expect(result).toBeInTheDocument();
  });

  it("shows when there is an error", async () => {
    const inputField = screen.getByPlaceholderText("E-mail address");
    fireEvent.change(inputField, {
      target: { value: "broken@example.com" },
    });

    const submit = screen.getByRole("button", { name: "Reset password" });
    submit.click();

    const header = await screen.findByRole("heading", {
      name: "Unable to reset the password",
    });
    expect(header).toBeInTheDocument();

    const result = await screen.findByText("It broke");
    expect(result).toBeInTheDocument();
  });
});
