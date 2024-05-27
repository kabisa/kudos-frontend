import { withMockedProviders } from "../../spec_helper";
import { ResetPasswordPage } from "./index";
import { MUTATION_RESET_PASSWORD } from "./ResetPasswordPage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_RESET_PASSWORD,
      variables: {
        currentPassword: "oldPassword",
        newPassword: "newPassword",
        newPasswordConfirmation: "newPassword",
      },
    },
    result: () => {
      mutationCalled = true;
      return { data: { resetPassword: { user: { id: "1" } } } };
    },
  },
];

describe("<ResetPasswordPage />", () => {
  beforeEach(() => {
    mutationCalled = false;
    render(withMockedProviders(<ResetPasswordPage />, mocks));
  });

  it("has three input elements", () => {
    const currentPassField = screen.getByLabelText("Current password");
    expect(currentPassField).toBeInTheDocument();

    const newPassField = screen.getByLabelText("New password");
    expect(newPassField).toBeInTheDocument();

    const confirmPassField = screen.getByLabelText("Confirm new password");
    expect(confirmPassField).toBeInTheDocument();
  });

  it("shows an error if the current password is blank", () => {
    const submitButton = screen.getByRole("button", { name: "Reset password" });
    submitButton.click();

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Unable to reset password",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Current password can't be blank."),
    ).toBeInTheDocument();
  });

  it("shows an error if the new password is blank", () => {
    const currentPassField = screen.getByLabelText("Current password");
    fireEvent.change(currentPassField, { target: { value: "oldPassword" } });

    const submitButton = screen.getByRole("button", { name: "Reset password" });
    submitButton.click();

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Unable to reset password",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("New password can't be blank."),
    ).toBeInTheDocument();
  });

  it("shows an error if the password confirm is blank", () => {
    const currentPassField = screen.getByLabelText("Current password");
    fireEvent.change(currentPassField, { target: { value: "oldPassword" } });

    const newPassField = screen.getByLabelText("New password");
    fireEvent.change(newPassField, { target: { value: "newPassword" } });

    const submitButton = screen.getByRole("button", { name: "Reset password" });
    submitButton.click();

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Unable to reset password",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Password confirmation can't be blank."),
    ).toBeInTheDocument();
  });

  it("shows an error if the new passwords do not match", () => {
    const currentPassField = screen.getByLabelText("Current password");
    fireEvent.change(currentPassField, { target: { value: "oldPassword" } });

    const newPassField = screen.getByLabelText("New password");
    fireEvent.change(newPassField, { target: { value: "newPassword" } });

    const confirmPassField = screen.getByLabelText("Confirm new password");
    fireEvent.change(confirmPassField, { target: { value: "newPass" } });

    const submitButton = screen.getByRole("button", { name: "Reset password" });
    submitButton.click();

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Unable to reset password",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Password don't match.")).toBeInTheDocument();
  });

  it("shows an error if the password length is too short", () => {
    const currentPassField = screen.getByLabelText("Current password");
    fireEvent.change(currentPassField, { target: { value: "oldPassword" } });

    const newPassField = screen.getByLabelText("New password");
    fireEvent.change(newPassField, { target: { value: "a" } });

    const confirmPassField = screen.getByLabelText("Confirm new password");
    fireEvent.change(confirmPassField, { target: { value: "a" } });

    const submitButton = screen.getByRole("button", { name: "Reset password" });
    submitButton.click();

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Unable to reset password",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Password needs to have a minimum of 8 characters."),
    ).toBeInTheDocument();
  });

  it("calls the mutation if all constraints are met", async () => {
    const currentPassField = screen.getByLabelText("Current password");
    fireEvent.change(currentPassField, { target: { value: "oldPassword" } });

    const newPassField = screen.getByLabelText("New password");
    fireEvent.change(newPassField, { target: { value: "newPassword" } });

    const confirmPassField = screen.getByLabelText("Confirm new password");
    fireEvent.change(confirmPassField, {
      target: { value: "newPassword" },
    });

    const submitButton = screen.getByRole("button", { name: "Reset password" });
    submitButton.click();

    await waitFor(() => {
      expect(mutationCalled).toBe(true);
    });
  });
});
