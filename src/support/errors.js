import settings from "src/config/settings";

export const ERROR_AMOUNT_BLANK = "Amount can't be empty or 0.";

export const ERROR_EMAIL_INVALID = "Invalid email.";
export const ERROR_EMAIL_PARSE = "Couldn't parse emails.";
export const ERROR_EMAIL_BLANK = "Email can't be blank.";

export const ERROR_INCOMPLETE = "You need to fill all fields.";

export const ERROR_MESSAGE_BLANK = "Message can't be blank.";
export const ERROR_MESSAGE_MIN_LENGTH = `Message must be at least ${
  settings.MIN_POST_MESSAGE_LENGTH
} characters.`;
export const ERROR_MESSAGE_MAX_LENGTH = `Message can have a maximum of ${
  settings.MAX_POST_MESSAGE_LENGTH
} characters.`;

export const ERROR_RECEIVERS_BLANK = "You must select at least one receiver.";

export const ERROR_SHORT_PASSWORD = `Password needs to have a minimum of ${
  settings.MIN_PASSWORD_LENGTH
} characters.`;
