import settings from "src/config/settings";

export const ERROR_INVALID_EMAIL = "Invalid email.";
export const ERROR_INCOMPLETE = "You need to fill all fields.";
export const ERROR_SHORT_PASSWORD = `Password needs to have a minimum of ${
  settings.MIN_PASSWORD_LENGTH
} characters.`;
